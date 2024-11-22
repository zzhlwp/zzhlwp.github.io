class GitHubAuth {
    constructor() {
        this.clientId = '你的Client_ID';  // 例如：'abc123def456'
        this.clientSecret = '你的Client_Secret';  // 例如：'789xyz...'
        this.redirectUri = 'http://你的网站域名/guide.html';
    }

    // 初始化GitHub登录
    login() {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=public_repo`;
        window.location.href = authUrl;
    }

    // 处理GitHub回调
    async handleCallback(code) {
        try {
            const response = await fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    code: code,
                    redirect_uri: this.redirectUri
                })
            });

            const data = await response.json();
            if (data.access_token) {
                localStorage.setItem('github_token', data.access_token);
                return true;
            }
            return false;
        } catch (error) {
            console.error('GitHub认证失败:', error);
            return false;
        }
    }
} 