<template>
  <div :class="this.name+' swiper-container order-0'" @mouseover="sliderHovered" @mouseleave="sliderUnhovered">
    <div :class="`swiper-wrapper ${(pagination)?'pagination-enabled':''}`">
      <slot name="slides"></slot>
    </div>
    <v-fade-transition>
      <div
          :class="`${this.name} swiper-button-next ${$vuetify.theme.dark?'grey darken-4':'white'} rounded-circle elevation-2`"
          v-show="navigation && showArrows"
      ></div>
    </v-fade-transition>
    <v-fade-transition>
      <div
          :class="`${this.name} swiper-button-prev ${$vuetify.theme.dark?'grey darken-4':'white'} rounded-circle elevation-2`"
          v-show="navigation && showArrows"
      ></div>
    </v-fade-transition>
    <div
        :class="`${this.name} swiper-pagination ${paginationColor}`"
        v-show="pagination"
    ></div>
  </div>
</template>

<script>
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  name: "CardSlider",
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 400
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    },
    navigation: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Boolean,
      default: true
    },
    paginationColor: {
      type: String,
      default: 'dark'
    },
    name: {
      type: String,
      default: 'slider'
    },
    xsView: {
      type: String,
      default: '1'
    },
    smView: {
      type: String,
      default: '2'
    },
    mdView: {
      type: String,
      default: '3'
    },
    lgView: {
      type: String,
      default: '4'
    },
    xlView: {
      type: String,
      default: '5'
    },
    start: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    swiper: {},
    showArrows: false
  }),
  methods: {
    sliderHovered(){
      this.swiper[this.name].autoplay.stop();

      this.showArrows = true;
    },
    sliderUnhovered(){
      if(this.autoplay)
        this.swiper[this.name].autoplay.start();

      this.showArrows = false;
    },
    renderSlider(){
      SwiperCore.use([Navigation, Pagination, Autoplay]);

      this.swiper[this.name] = new Swiper('.'+this.name+'.swiper-container', {
        direction: 'horizontal',
        loop: this.loop,
        speed: this.speed,
        grabCursor: true,

        hideOnClick: true,

        preloadImages: false,

        breakpoints: {
          0: {
            slidesPerView: this.xsView,
            spaceBetween: 0
          },
          600: {
            slidesPerView: this.smView,
            spaceBetween: 12
          },
          960: {
            slidesPerView: this.mdView,
            spaceBetween: 12
          },
          1264: {
            slidesPerView: this.lgView,
            spaceBetween: 12
          },
          1904: {
            slidesPerView: this.xlView,
            spaceBetween: 12
          }
        },

        autoplay: {
          delay: this.interval,
          disableOnInteraction: false
        },

        pagination: {
          el: '.'+this.name+'.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
          dynamicMainBullets: 2
        },

        navigation: {
          nextEl: '.'+this.name+'.swiper-button-next',
          prevEl: '.'+this.name+'.swiper-button-prev'
        }
      });

      if(!this.autoplay){
        this.swiper[this.name].autoplay.stop();
      }
    }
  },
  watch: {
    start: {
      handler(){
        this.renderSlider()
      }
    },
    '$route.params.locale': {
      handler(){
        this.swiper[this.name].destroy()

        this.renderSlider()
      }
    }
  }
}
</script>

<style>
.swiper-wrapper.pagination-enabled{
  padding-bottom: 30px;
}
.swiper-wrapper.pagination-enabled .swiper-pagination-fraction, .swiper-wrapper.pagination-enabled .swiper-pagination-custom, .swiper-wrapper.pagination-enabled .swiper-container-horizontal > .swiper-pagination-bullets{
  bottom: 0 !important;
}
.swiper-container{
  width: 100%;
}
.swiper-pagination .swiper-pagination-bullet{
  background: #000 !important;
}
.swiper-pagination.light .swiper-pagination-bullet{
  background: #fff !important;
}
.swiper-button-prev:after, .swiper-button-next:after{
  font-size: 30px;
}
.swiper-button-hidden{
  display: none;
}
.swiper-button-disabled{
  display: none !important;
}
.swiper-button-prev, .swiper-button-next{
  width: 40px;
  height: 40px;
  margin-top: -20px;
}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next{
  left: 1px !important;
  right: auto !important;
}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev{
  right: 1px !important;
  left: auto !important;
}
.swiper-button-prev:after, .swiper-button-next:after{
  font-size: 16px;
  color: #9e9e9e;
}
.swiper-slide{
  height: fit-content;
}
</style>
