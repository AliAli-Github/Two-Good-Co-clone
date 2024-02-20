gsap.to(".elem-div h1", {
    transform: "translateY(0)",
    opacity: 1,
    stagger: 0.2
});

gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".container"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".container" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".container", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".container").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


gsap.to(".logo svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
        trigger: ".page-one",
        scroller: ".container",
        start: "top 10%",
        end: "top 0%",
        scrub: true,
    }
});

gsap.to(".navigation", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
        trigger: ".page-one",
        scroller: ".container",
        start: "top 10%",
        end: "top 0%",
        scrub: true
    }
})

var cards = document.querySelector(".products-div");

document.addEventListener("mousemove", (details) => {
    gsap.to(".cursor", {
        left: details.x,
        top: details.y
    })
})

cards.addEventListener("mouseenter", (details) => {
    gsap.to(".cursor", {
        transform: `translate(-50%, -50%) scale(1)`,
        left: details.x,
        top: details.y
    })
})

cards.addEventListener("mouseleave", (details) => {
    gsap.to(".cursor", {
        transform: `translate(-50%, -50%) scale(0)`,
        left: details.x,
        top: details.y
    })
})