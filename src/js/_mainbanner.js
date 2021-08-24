window.onload = function() {
    let supportsTouch = ('ontouchstart' in document.documentElement);
    if (document.querySelector("[data-canvas-rel]")) {
        let width_pic = document.getElementById("under-canvas").offsetWidth;
        let height_pic = document.getElementById("under-canvas").offsetHeight;
        let control = document.querySelector("[data-canvas-control]");
        let control_area = document.querySelector("[data-canvas-area]");
        let radius = 150;

        if (window.innerWidth <= 1670) {
            radius = 125;
        }
    
        let x = (window.pageXOffset !== undefined)
            ? window.pageXOffset
            : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
        let y = (window.pageYOffset !== undefined)
            ? window.pageYOffset
            : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            
        let canvas = document.getElementById("car-canvas");
        canvas.style.width = width_pic + "px";
        canvas.style.height = height_pic + "px";
        let canvas_width = width_pic;
        let canvas_height = height_pic;
        let canvas_pos = canvas.getBoundingClientRect();
        canvas.width = canvas_width;
        canvas.height = canvas_height;

        control_area.style.width = width_pic + "px";
        
        let ctx = canvas.getContext("2d");

        

        let img = new Image();
        img.onload = function() {
            ctx.save();
            if (window.innerWidth <= 1230) {
                ctx.rect(canvas_width/2, 0, canvas_width, canvas_height);
                ctx.fill();
            }
            else {
                ctx.arc(width_pic/2 + 44, height_pic/2 - 42, radius, 0, 2 * Math.PI, true);
                ctx.fill();
            }
            ctx.globalCompositeOperation="source-in";
            ctx.drawImage(img, 0, 0, canvas_width, canvas_height);
        };

        

        control.style.opacity = "1";
        if (window.innerWidth <= 1230) {
            control.style.left = width_pic/2 +"px";
            control.style.top = height_pic/2 + "px";
        }
        else {
            control.style.left = (width_pic/2 + 44) + "px";
            control.style.top = (height_pic/2 - 42)+ "px";
        }
        img.src = canvas.closest("[data-canvas-rel]").querySelector("[data-img-src]").getAttribute("data-img-src");
    
        window.addEventListener("resize", function() {
            width_pic = document.getElementById("under-canvas").offsetWidth;
            height_pic = document.getElementById("under-canvas").offsetHeight;
            canvas.style.width = width_pic + "px";
            canvas.style.height = height_pic + "px";
            canvas_width = width_pic;
            canvas_height = height_pic;
            canvas_pos = canvas.getBoundingClientRect();
            canvas.width = canvas_width;
            canvas.height = canvas_height;

            control_area.style.width = width_pic + "px";

            
            
            ctx.save();
            if (window.innerWidth <= 1230) {
                control.style.left = width_pic/2 + "px";
                control.style.top = height_pic/2 + "px";
                ctx.rect(canvas_width/2, 0, canvas_width, canvas_height);
                ctx.fill();
            }
            else {
                control.style.left = (width_pic/2 + 44) + "px";
                control.style.top = (height_pic/2 - 42)+ "px";
                ctx.arc(width_pic/2 + 44, height_pic/2 - 42, radius, 0, 2 * Math.PI, true);
                ctx.fill();
            }
            ctx.globalCompositeOperation="source-in";
            ctx.drawImage(img, 0, 0, canvas_width, canvas_height);

            if (window.innerWidth <= 1670) {
                radius = 125;
            }
        })
        control.addEventListener("dragstart", function(e) {
            e.preventDefault();
        })
        if (supportsTouch) {
            control.addEventListener("touchstart", function(e) {
                control_area.addEventListener("touchmove", dragZone);
                document.body.addEventListener("touchend", removeMouseMove);
                document.body.classList.add("overflow-hidden");
            });
            control.addEventListener("touchend", function(){
                control_area.removeEventListener("touchmove", dragZone);
                document.body.removeEventListener("touchend", removeMouseMove);
                document.body.classList.remove("overflow-hidden");
            });
        }
        else {
            control.addEventListener("mousedown", function(e) {
                control_area.addEventListener("mousemove", dragZone);
                document.body.addEventListener("mouseup", removeMouseMove);
            });
            control_area.addEventListener("mouseleave", function(){
                control_area.removeEventListener("mousemove", dragZone);
                document.body.removeEventListener("mouseup", removeMouseMove);
            });
        }

        function removeMouseMove(e) {
            control_area.removeEventListener("mousemove", dragZone);
            document.body.removeEventListener("mouseup", removeMouseMove);
        }
        function dragZone(e){
            let x_new = (window.pageXOffset !== undefined)
                ? window.pageXOffset
                : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
            let y_new = (window.pageYOffset !== undefined)
                ? window.pageYOffset
                : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            
            let canvas_y = canvas_pos.top + y;
            let canvas_x = canvas_pos.left + x;
            let circle_x;
            let circle_y;
            if (supportsTouch) {
                circle_x = +e.changedTouches[0].pageX - +canvas_x;
                circle_y = +e.changedTouches[0].pageY - +canvas_y;
            }
            else {
                circle_x = +e.pageX - +canvas_x;
                circle_y = +e.pageY - +canvas_y;
            }
            if (!supportsTouch) {
                if (e.pageX >= canvas_x && e.pageX <= canvas_x + canvas.width && e.pageY >= canvas_y && e.pageY <= canvas_y + canvas.height) {
                    cursorInZone();
                }
                else {
                    cursorOutZone();
                }
            }
            else {
                if (e.changedTouches[0].pageX >= canvas_x && e.changedTouches[0].pageX <= canvas_x + canvas.width && e.changedTouches[0].pageY >= canvas_y && e.changedTouches[0].pageY <= canvas_y + canvas.height) {
                    cursorInZone();
                }
                else {
                    cursorOutZone();
                }
            }
            function cursorInZone() {
                if (window.innerWidth <= 1230) {
                    control.style.left = circle_x + "px";
                    control.style.top = height_pic/2 + "px";
                }
                else {
                    control.style.left = circle_x + "px";
                    control.style.top = circle_y + "px";
                }
                ctx.globalCompositeOperation="source-over";
                ctx.clearRect(0, 0, canvas_width, canvas_height);
        
                ctx.beginPath();
                if (window.innerWidth <= 1230) {
                    ctx.rect(circle_x, 0, canvas_width, canvas_height);
                    ctx.fill();
                }
                else {
                    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI, true);
                    ctx.fill();
                }
                ctx.globalCompositeOperation="source-in";
                ctx.drawImage(img, 0, 0, canvas_width, canvas_height);
                ctx.closePath();
            }
            function cursorOutZone() {
                
        
                ctx.globalCompositeOperation="source-over";
                ctx.clearRect(0, 0, canvas_width, canvas_height);
        
                ctx.beginPath();
                if (window.innerWidth <= 1230) {
                    control.style.left = width_pic/2 + "px";
                    control.style.top = height_pic/2 + "px";
                    ctx.rect(canvas_width/2, 0, canvas_width, canvas_height);
                    ctx.fill();
                }
                else {
                    control.style.left = (width_pic/2 + 44) + "px";
                    control.style.top = (height_pic/2 - 42)+ "px";
                    ctx.arc(width_pic/2 + 44, height_pic/2 - 42, radius, 0, 2 * Math.PI, true);
                    ctx.fill();
                }
                ctx.globalCompositeOperation="source-in";
                ctx.drawImage(img, 0, 0, canvas_width, canvas_height);
                ctx.closePath();
                control_area.removeEventListener("mousemove", dragZone);
                document.body.removeEventListener("mouseup", removeMouseMove);
            }
        }
    }
}

$(document).ready(function() {
    if (window.innerWidth <= 1230) {
        $("#banner-btn").appendTo($("#adapt-btn"));
    }
    if (window.innerWidth <= 875) {
        $("#banner-product").appendTo($("#adapt-product"));
    }
    window.addEventListener("resize", function() {
        if (window.innerWidth <= 1230) {
            $("#banner-btn").appendTo($("#adapt-btn"));
        }
        else {
            $("#banner-btn").appendTo($("#banner-info"));
        }
        if (window.innerWidth <= 875) {
            $("#banner-product").appendTo($("#adapt-product"));
        }
        else {
            $("#banner-product").appendTo($("#banner-product-rel"));
        }
    });
})