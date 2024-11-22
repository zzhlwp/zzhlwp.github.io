document.addEventListener('DOMContentLoaded', function() {
    // 访问统计功能
    function updateVisitCount() {
        let localVisits = parseInt(localStorage.getItem('visitCount') || '0');
        let totalVisits = parseInt(localStorage.getItem('totalVisits') || '0');

        localVisits++;
        totalVisits++;

        localStorage.setItem('visitCount', localVisits.toString());
        localStorage.setItem('totalVisits', totalVisits.toString());

        const visitCountElement = document.getElementById('visitCount');
        const totalVisitsElement = document.getElementById('totalVisits');
        if (visitCountElement) {
            visitCountElement.textContent = `${localVisits} 次`;
        }
        if (totalVisitsElement) {
            totalVisitsElement.textContent = `${totalVisits} 次`;
        }
    }

    // 运行时间计算
    function updateRuntime() {
        const startTime = new Date('2024-11-21').getTime();
        const currentTime = new Date().getTime();
        const runTime = currentTime - startTime;

        const days = Math.floor(runTime / (24 * 60 * 60 * 1000));
        const hours = Math.floor((runTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((runTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((runTime % (60 * 1000)) / 1000);

        const runtimeElement = document.getElementById('runtime');
        if (runtimeElement) {
            runtimeElement.textContent = `${days}天${hours}小时${minutes}分${seconds}秒`;
        }
    }

    // 初始化
    updateVisitCount();
    updateRuntime();
    
    // 定时更新运行时间
    setInterval(updateRuntime, 1000);
}); 