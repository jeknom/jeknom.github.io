document.addEventListener("DOMContentLoaded", () => {
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
