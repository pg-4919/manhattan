const body = document.documentElement || document.body;
const progressBar = document.getElementById("progress-bar");

let globalScrollEventCounter = 0; //performance check

//throttle scroll events for performance
function throttle(callback, delay) {
    let time = Date.now();
    return () => {
        if ((time + delay - Date.now()) < 0) {
            callback();
            time = Date.now();
        }
    }
}

//update scrollbar
function updateScrollbar() {
    globalScrollEventCounter += 1;
    const scrollPercent = (body.scrollTop / (body.scrollHeight - body.clientHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
}

document.addEventListener("ready", updateScrollbar())
document.addEventListener("scroll", throttle(updateScrollbar, 15), { capture: true, passive: true });

window.addEventListener("DOMContentLoaded", () => { //MAGIC
    console.log("test")
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
            console.log("Test")
			const id = entry.target.getAttribute("id");
			if (entry.intersectionRatio > 0) document.querySelector(`.sidebar-link#${id}`).classList.add("active");
			else document.querySelector(`.sidebar-link#${id}`).classList.remove("active");
		});
	});

	document.querySelectorAll(".chapter").forEach((section) => {
        console.log(section)
		observer.observe(section);
	});	
});