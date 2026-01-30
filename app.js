const items = [
    // ВАЖНО: tileImg (картинка на кнопке) != openImg (фото внутри)
    { id:"p1", tileImg:"assets/1.jfif", openImg:"assets/11.jpg", caption:"Любимая" },
    { id:"p2", tileImg:"assets/2.jfif", openImg:"assets/22.jpg", label:"Открыть", caption:"Милая" },
    { id:"p3", tileImg:"assets/3.jfif", openImg:"assets/33.jpg", label:"Открыть", caption:"Нежная" },
    { id:"p4", tileImg:"assets/4.jfif", openImg:"assets/44.jpg", label:"Открыть", caption:"Единственная" },
    { id:"p5", tileImg:"assets/5.jfif", openImg:"assets/55.jpg", label:"Открыть", caption:"Дорогая" },
    { id:"p6", tileImg:"assets/6.jfif", openImg:"assets/66.jpg", label:"Открыть", caption:"Откровенная" },
    { id:"p7", tileImg:"assets/7.jfif", openImg:"assets/77.jpg", label:"Открыть", caption:"Душевная" },
    { id:"p8", tileImg:"assets/8.jfif", openImg:"assets/88.jpg", label:"Открыть", caption:"Ценная" },
    // 8-я кнопка: плитка со своей картинкой, а внутри письмо
    { id:"final", tileImg:"assets/9.jfif", label:"Письмо", letter:true }
  ];
  
  const grid = document.getElementById("grid");
  
  const modal = document.getElementById("modal");
  const backdrop = document.getElementById("backdrop");
  const closeBtn = document.getElementById("closeBtn");
  
  const photoMode = document.getElementById("photoMode");
  const letterMode = document.getElementById("letterMode");
  
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  
  const letterTitle = document.getElementById("letterTitle");
  const letterText = document.getElementById("letterText");
  
  function openModal(){
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  }
  
  function closeModal(){
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    modalImg.src = "";
  }
  
  function showPhoto(item){
    letterMode.classList.remove("is-active");
    photoMode.classList.add("is-active");
  
    modalImg.src = item.openImg;          // ✅ фото внутри
    modalImg.alt = item.caption || "Фото";
    modalCaption.textContent = item.caption || "";
  }
  
  function showLetter(){
    photoMode.classList.remove("is-active");
    letterMode.classList.add("is-active");
  
    letterTitle.textContent = "Для тебя.";
    letterText.textContent =
  `Слов наверно не хватит, чтобы всё описать, но постараюсь максимально кратко.
  
Первое, что хотелось бы сделать - извиниться перед тобой за то, какой я олень проблемный, я постоянно косячу перед тобой, обижаю, но знай, что я делаю это не специально, я тебя безумно люблю, ценю и уважаю.

Ты не самое лучшее, что произошло со мной в 2025 году. Ты самое лучшее, что произошло со мной в жизни, ты мой маленький ангелочек, джекпот, просто супер девочка, лучшего со мной уже не произойдёт в жизни!

Спасибо тебе большое, что ты меня терпишь, остаёшься со мной не смотря на всю хуйню, что я вытворяю`;
  }
  
  function render(){
    grid.innerHTML = items.map(item => `
      <button class="tile" data-id="${item.id}" aria-label="${item.label}">
        <img class="tile__img" src="${item.tileImg}" alt="">
        <div class="tile__shade"></div> 
      </button>
    `).join("");
  
    grid.querySelectorAll(".tile").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const item = items.find(x => x.id === id);
        if(!item) return;
  
        openModal();
        if(item.letter) showLetter();
        else showPhoto(item);
      });
    });
  }
  
  render();
  
  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
  });
  