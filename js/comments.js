class CommentSystem {
    constructor() {
        this.repoOwner = '你的GitHub用户名';
        this.repoName = 'comments-board';
        this.issuesApiUrl = `https://api.github.com/repos/${this.repoOwner}/${this.repoName}/issues`;
        this.commentsPerPage = 10;
        this.currentPage = 1;
    }

    // 初始化评论系统
    async init() {
        await this.loadComments();
        this.bindEvents();
    }

    // 绑定事件
    bindEvents() {
        const submitBtn = document.getElementById('submit-comment');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitComment());
        }

        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreComments());
        }
    }

    // 提交评论
    async submitComment() {
        const content = document.getElementById('comment-content').value.trim();
        if (!content) return;

        const token = localStorage.getItem('github_token');
        if (!token) {
            alert('请先登录GitHub');
            return;
        }

        try {
            const response = await fetch(this.issuesApiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: `Comment at ${new Date().toISOString()}`,
                    body: content,
                    labels: ['comment']
                })
            });

            if (response.ok) {
                document.getElementById('comment-content').value = '';
                await this.loadComments(true);
            }
        } catch (error) {
            console.error('评论提交失败:', error);
            alert('评论提交失败，请稍后重试');
        }
    }

    // 加载评论
    async loadComments(refresh = false) {
        if (refresh) {
            this.currentPage = 1;
            document.getElementById('comments-list').innerHTML = '';
        }

        try {
            const response = await fetch(
                `${this.issuesApiUrl}?labels=comment&state=open&per_page=${this.commentsPerPage}&page=${this.currentPage}`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const comments = await response.json();
                this.renderComments(comments);
            }
        } catch (error) {
            console.error('加载评论失败:', error);
        }
    }

    // 渲染评论
    renderComments(comments) {
        const commentsList = document.getElementById('comments-list');
        
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item bg-white rounded-lg shadow p-4 mb-4';
            commentElement.innerHTML = `
                <div class="flex items-center mb-2">
                    <img src="${comment.user.avatar_url}" alt="${comment.user.login}" 
                         class="w-8 h-8 rounded-full mr-2">
                    <div>
                        <div class="font-semibold">${comment.user.login}</div>
                        <div class="text-sm text-gray-500">
                            ${new Date(comment.created_at).toLocaleString()}
                        </div>
                    </div>
                </div>
                <div class="text-gray-700 mt-2">${marked(comment.body)}</div>
            `;
            commentsList.appendChild(commentElement);
        });

        // 更新加载更多按钮状态
        const loadMoreBtn = document.getElementById('load-more');
        if (comments.length < this.commentsPerPage) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
} 