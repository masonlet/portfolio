const valid = /^[a-zA-Z0-9_.-]+$/;

export default async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ 
    error: "Method not allowed" 
  });

  const { owner, repo } = req.query;
  if (!owner || !repo) return res.status(400).json({ 
    error: "Missing owner or repo" 
  });

  if (!valid.test(owner) || !valid.test(repo)
  ) return res.status(400).json({ 
    error: "Invalid owner or repo" 
  });

  try {
     const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    const headers = {
      "Accept": "application/vnd.github.html",      
      "User-Agent": "portfolio-readme-loader",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }),
    };
 
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      console.error(`GitHub API returned ${response.status} for ${owner}/${repo}`);
           
      if (response.status === 403 && 
          response.headers.get("x-ratelimit-remaining") === "0"
      ) return res.status(429).json({ 
        error: "GitHub rate limit exceeded" 
      });

      return res.status(response.status).json({
        error: `Failed to fetch README: ${response.status}`
      });
    }

    const githubHtml = await response.text();
    if (!githubHtml?.trim()) return res.status(404).json({
      error: "No README content found"
    });

    const baseUrl = `https://github.com/${owner}/${repo}`;
    const rawBase = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD`;
    const processedHtml = githubHtml
      .replace(/src="(?!http)(.*?)"/g, `src="${rawBase}/$1"`)
      .replace(/href="(?!http)(.*?)\.md"/g, `href="${baseUrl}/blob/HEAD/$1.md"`)
      .replace(/href="(?!http)(?!#)(.*?)"/g, `href="${baseUrl}/blob/HEAD/$1"`);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    return res.status(200).send(
      `<div class="readme-content">${processedHtml}</div>`
    );
  } catch (err) {
    console.error("README endpoint error:", err);
    return res.status(500).json({ 
      error: "Server error" 
    });
  }
};
