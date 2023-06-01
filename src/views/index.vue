<script>
export default {
  name: "index-home",
};
</script>

<template>
  <div class="main-content">
    <nav>
      <h2>CV-Generator</h2>
    </nav>
    <div class="row wrapper">
      <div class="col-md-6 content-left">
        <div class="text-white">
          <div class="wrap-text">
            <p class="title">BUILD YOUR BEST</p>
            <p class="title2">RESUME</p>
          </div>
          <div class="center-text">
            Get hired by company with <br />
            professional resume
          </div>
          <router-link to="/resume">
            <button class="btn">Try Now</button>
          </router-link>
        </div>
      </div>
      <div class="col-md-6 content-right">
        <div class="dot1" />
        <div class="dot2" />
        <div
          id="carouselExampleDark"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner text-white">
            <div class="carousel-item active" data-bs-interval="2000">
              <img src="@/assets/img/img-carous1.svg" alt="..." />
              <h5 class="text-center">ATS Resume</h5>
            </div>
            <div class="carousel-item" data-bs-interval="2000">
              <img src="@/assets/img/img-carous1.svg" alt="..." />
              <h5 class="text-center">Creative Resume</h5>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    <footer>
      <p class="name">Dwi Fakhri Chusaini</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.row {
  --bs-gutter-x: 0;
}

nav {
  background: #f1f1f1;
  color: #82b7dc;
  min-height: 5rem;
  padding: 1rem 10%;
}

footer {
  background: #f1f1f1;
  min-height: 5rem;
  padding: 1rem 10%;
}

.wrapper {
  width: 100%;
  max-height: 100%;
  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
}

.content-left {
  background: #82b7dc;
  display: flex;
  align-items: center;
  padding: 20px 0;
  justify-content: center;

  @media (min-width: 1023px) {
    padding: 0 0 0 10%;
    justify-content: start;
  }
}

.content-right {
  background: #82b7dc;
  text-align: center;
  padding: 20px 0;

  @media (min-width: 1023px) {
    padding: 0;
  }
}

.name {
  width: fit-content;
  border-bottom: 3px solid #808080;
}

.wrap-text {
  line-height: 55px;
  text-align: start;
}

.center-text {
  margin: 60px 0 15px 0;
}

.title {
  font-size: 40px;
  font-weight: 300;
}

.title2 {
  font-weight: 700;
  font-size: 70px;
}

img {
  padding: 10px;
  height: 34rem;

  @media (min-width: 768px) and (max-width: 1024px) {
    height: 30rem;
    padding: 0;
  }

  @media (max-width: 767px) {
    height: 450px;
    padding: 0;
  }
}

.dot1 {
  width: 146px;
  height: 87px;
  position: absolute;
  background-image: radial-gradient(#3466aa 6px, transparent 0);
  background-size: 30px 30px;
  background-position: -27px -36px -20px -10px;
  right: 31%;
  top: 4rem;

  @media (max-width: 767px) {
    left: 8%;
  }
}

.dot2 {
  width: 146px;
  height: 87px;
  position: absolute;
  background-image: radial-gradient(#3466aa 6px, transparent 0);
  background-size: 30px 30px;
  background-position: -27px -36px -20px -10px;
  right: 11%;
  bottom: 7rem;

  @media (min-width: 768px) and (max-width: 1024px) {
    right: 5%;
    bottom: 27rem;
  }

  @media (max-width: 767px) {
    right: 8%;
    bottom: 20rem;
  }
}
</style>
