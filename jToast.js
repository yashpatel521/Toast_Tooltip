let toasts = 0;
let manager = {
    ready: true,
    jobs: [],
    currentWorkingID: 0,
    addJob(job) {
        this.ready = false;
        job.type === "show" ? this.jobs.push({ text: job.text, args: job.args, type: "show" }) : this.jobs.push({ id: job.id, type: "hide" });

        const waitUntilReady = setInterval(() => {
            if (this.workJobOff()) {
                clearInterval(waitUntilReady);
            }
        }, 250);
    },
    removeJob(id) {
        if (this.currentWorkingID === id) {
            this.ready = true;
        }
    },
    workJobOff() {
        if (this.ready && this.jobs.length > 0) {
            this.jobs[0].type === "show" ? showToast(this.jobs[0].text, this.jobs[0].args) : hideToast(this.jobs[0].id);
            this.jobs.splice(0, 1);
            return true;
        }
    }
};

function showToast(text, { duration = 3000, background = "#232323", color = "#fff", borderRadius = "0px", close = false, progressBar = false } = {}) {
    const selectedToast = toasts;
    if (!manager.ready) {
        manager.addJob({ text: text, args: showToast.arguments[1], workingID: selectedToast, type: "show" });
        return;
    }
    manager.currentWorkingID = selectedToast;

    $("#toasts").append(`
        <div style="background: ${background}; color: ${color}; border-radius: ${borderRadius}; ${close ? 'display: flex;' : ''}" data-toast-id="${toasts}" class="toast">
            <span>${text}</span>
            ${progressBar ? `<div style="animation-duration: ${duration}ms; background: ${color};" class="progress"></div>` : ""}
        </div>
    `);

    if (close)
        $(`[data-toast-id="${selectedToast}"]`).append(`
            <div style="height: ${$(`[data-toast-id="${selectedToast}"] > span`).height()}px" onclick="hideToast(${selectedToast})" class="close">&times;</div>
        `);

    $(".toast").map((i) => {
        manager.ready = false;
        if (i !== selectedToast) {
            $(".toast").eq(i).animate({
                "margin-top": "+=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
            }, 300);

            setTimeout(() => {
                manager.removeJob(selectedToast);
            }, 300);
        }else {
            setTimeout(() => {
                $(".toast").eq(i).animate({
                    "margin-top": "25px"
                }, 300);

                setTimeout(() => {
                    manager.removeJob(selectedToast);
                }, 300);
            }, 150);
        }
    });

    setTimeout(() => {
        $(`[data-toast-id="${selectedToast}"]`).animate({
            "margin-right": "-" + parseInt($(`[data-toast-id="${selectedToast}"]`).width() + (15 * 2) + 25 + 100) + "px"
        }, 300);

        if (selectedToast !== toasts) {
            $(".toast").map((i) => {
                if (i < selectedToast) {
                    setTimeout(() => {
                        $(".toast").eq(i).animate({
                            "margin-top": "-=" + parseInt($(`[data-toast-id="${selectedToast}"]`).height() + (15 * 2) + 15 + 5) + "px"
                        }, 300);
                    }, 300);
                }
            });
        }

        setTimeout(() => {
            $(`[data-toast-id="${selectedToast}"]`).addClass("hidden");
        }, 300);
    }, duration);

    toasts++;
    return selectedToast;
}

function hideToast(id) {
    if (parseInt($(`[data-toast-id="${id}"]`).css("margin-right").replace("px", "")) === 0) {
        $(`[data-toast-id="${id}"]`).animate({
            "margin-right": "-" + parseInt($(`[data-toast-id="${id}"]`).width() + (15 * 2) + 25 + 100) + "px"
        }, 300);

        if (id !== toasts) {
            $(".toast").map((i) => {
                if (i < id) {
                    setTimeout(() => {
                        $(".toast").eq(i).animate({
                            "margin-top": "-=" + parseInt($(`[data-toast-id="${id}"]`).height() + (15 * 2) + 15 + 5) + "px"
                        }, 300);
                    }, 300);
                }
            });
        }

        setTimeout(() => {
            $(`[data-toast-id="${id}"]`).addClass("hidden");
        }, 300);
    }
}

(() => {
    $("head").append(`
        <style>
            .toast {
                padding: 15px;
                color: #fff;
                position: fixed;
                right: 25px;
                top: 0;
                margin-top: -100px;
                box-shadow: 0 10px 40px 0 rgba(62,57,107,.07), 0 2px 9px 0 rgba(62,57,107,.12);
                max-width: 50%;
                z-index: 2147483647;
            }
            
            @keyframes progress {
                from { width: 100% }
                to { width: 0% }
            }
            
            .toast > .progress {
                position: absolute;
                height: 2px;
                width: 100%;
                margin-left: -15px;
                bottom: 0;
                opacity: 0.75;
                animation: progress linear forwards;
            }
            
            .toast > .close {
                margin-left: 15px;
                opacity: 0.75;
                font-size: 24px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
        </style>
    `);

    $("body").append(`<div id="toasts"></div>`);
})();
