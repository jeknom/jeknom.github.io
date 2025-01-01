

document.addEventListener("DOMContentLoaded", () => {
    let lightCanMove = false;
    setTimeout(() => lightCanMove = true, 3000);

    const flashlight = document.getElementById('flashlight');
    let mouseX = window.innerWidth / 2; // Default to center of the screen
    let mouseY = window.innerHeight / 2; // Default to center of the screen
    let currentX = mouseX;
    let currentY = mouseY;

    function positionFlashlightOnMouseMove(e?: MouseEvent) {
        if (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    }

    function updateFlashlightPosition() {
        if (flashlight === null) {
            return;
        }

        
        if (lightCanMove) {
            const speed = 0.1;
            
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;
    
            flashlight.style.left = `${currentX}px`;
            flashlight.style.top = `${currentY}px`;
        }

        requestAnimationFrame(updateFlashlightPosition);
    }

    updateFlashlightPosition();

    document.addEventListener('mousemove', positionFlashlightOnMouseMove);

    const imgElements = document.querySelectorAll("img");

    imgElements.forEach((imgEl) => {
        imgEl.addEventListener(
            "load",
            () => imgEl.classList.add("animate-appear"),
        );

        // If the image is already loaded (cached by the browser), add the class
        if (imgEl.complete) {
            imgEl.classList.add("animate-appear");
        }
    });


    const target = document.getElementById('flashlight-off');

    if (flashlight === null || target === null) {
        console.error('Flashlight or target not found');
        return;
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                flashlight.classList.remove('visible');
            } else {
                flashlight.classList.add('visible');
            }
        });
    }, options);

    observer.observe(target);
});

class TimeSince extends HTMLElement {
    connectedCallback() {
        this.innerHTML = this.getYearsAndMonthsSince(this.innerHTML);
    }

    private getYearsAndMonthsSince(dateString: string) {
        const [day, month, year] = dateString.split("-").map(Number);
        const inputDate = new Date(year, month - 1, day);
        const currentDate = new Date();

        let years = currentDate.getFullYear() - inputDate.getFullYear();
        let months = currentDate.getMonth() - inputDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years}y ${months}mo`;
    }
}

customElements.define("time-since", TimeSince);
