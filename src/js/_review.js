$(document).ready(function(){
    $("body").on("click", "[data-toggle-like]", function() {
        if ($(this).hasClass("__active")) {
            $(this).removeClass("__active");
        }
        else {
            $(this).parents("[data-toggle-mark]").find("[data-toggle-like]").removeClass("__active");
            $(this).addClass("__active");
        }
    })
    $("body").on("click", "[data-open-rev]", function() {
        $(this).parents("[data-parent-rev]").addClass("__active");
    });
    $("body").on("click", "[data-close-rev]", function() {
        $(this).parents("[data-parent-rev]").removeClass("__active");
    });
    
    let files = [];
    const changeHandler = function(e, input) {

        if (input.closest("[data-load-rel]").querySelector(".loadFile__item-image")) {
            input.closest("[data-load-rel]").querySelector(".loadFile__item-image").remove();
        }
        if (e.isTrusted) {
            files = Array.from(e.target.files);
        }

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "loadFile__item loadFile__item-image";
        

        const imageList = document.createElement("div");
        imageList.className = "loadImages";
        
        imageList.addEventListener("click", function(e) {
            removeHandler(e)
        })

        files.forEach(file => {
            if (!file.type.match("image")) {
                return
            }
            const reader = new FileReader();
            reader.onload = ev => {
                if (!input.closest("[data-load-rel]").querySelector(".loadFile__item-image")) {
                    input.closest("[data-load-rel]").insertAdjacentElement("beforeEnd", imageWrapper);
                    imageWrapper.insertAdjacentElement("beforeEnd", imageList);
                }
                const imageItem = document.createElement("div");
                imageItem.className = "loadImages__item";
                imageItem.style.backgroundImage = `url(${ev.target.result})`;

                const removeImg = document.createElement("button");

                removeImg.setAttribute("type", "button");
                removeImg.setAttribute("data-name", file.name);
                removeImg.className = "loadImages__remove";
                removeImg.innerHTML = `<svg viewBox="0 0 20 20"><path d="M11.4,10,20,1.4V0H18.6L10,8.6,1.4,0H0V1.4L8.6,10,0,18.6V20H1.4L10,11.4,18.6,20H20V18.6Z"/></svg>`
                
                imageItem.append(removeImg);
                imageList.insertAdjacentElement("beforeEnd", imageItem)
            }
            reader.readAsDataURL(file)
        })

    }

    const removeHandler = function(e) {
        if (e.target.closest(".loadImages__remove")) {
            const name = e.target.closest(".loadImages__remove").dataset.name;
            files = files.filter(file => file.name !== name);
            if (files.length === 0) {
                e.target.closest(".loadFile__item-image").remove();
            }
            e.target.closest(".loadImages__item").remove();
        }
    }

    const loadInputs = document.querySelectorAll("[data-load-input]");
    Array.prototype.forEach.call(loadInputs, function(loadInput) {
        loadInput.addEventListener("change", function(event) {
            changeHandler(event, loadInput);
        })
    });

    const dropArea = document.querySelectorAll("[data-load-el]");
    Array.prototype.forEach.call(dropArea, function(dropItem) {
        ;["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropItem.addEventListener(eventName, preventDefaults, false)
        })
        ;["dragenter", "dragover"].forEach(eventName => {
            dropItem.addEventListener(eventName, highlight, false)
        })
        ;["dragleave", "drop"].forEach(eventName => {
            dropItem.addEventListener(eventName, unhighlight, false)
        })
        dropItem.addEventListener('drop', function (e) {
            handleDrop(e, dropItem);
        }, false);

        function handleDrop(e, context) {
            let dt = e.dataTransfer
            let files = dt.files
            handleFiles(files, context)
        }
        function highlight(e) {
            dropItem.classList.add("highlight");
        }
        function unhighlight(e) {
            dropItem.classList.remove("highlight");
        }
        function preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    function handleFiles(dropFiles, context) {
        Array.from(dropFiles).forEach(uploadFile);

        files = Array.from(dropFiles);
        
        context.querySelector("[data-load-input]").value = "";
        if(!/safari/i.test(navigator.userAgent)){
            context.querySelector("[data-load-input]").type = ''
            context.querySelector("[data-load-input]").type = 'file'
        }
        let event = new Event("change");
        context.querySelector("[data-load-input]").dispatchEvent(event);
    }
    function uploadFile(file) {
        // let url = 'ВАШ URL ДЛЯ ЗАГРУЗКИ ФАЙЛОВ'
        // let xhr = new XMLHttpRequest()
        // let formData = new FormData()
        // xhr.open('POST', url, true)
        // xhr.addEventListener('readystatechange', function(e) {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         // Готово. Информируем пользователя
        //     }
        //     else if (xhr.readyState == 4 && xhr.status != 200) {
        //         // Ошибка. Информируем пользователя
        //     }
        // })
        // formData.append('file', file)
        // xhr.send(formData)
    }
})