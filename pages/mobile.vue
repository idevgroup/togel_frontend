<template>
    <div>
        <div class="header">
            <div class="pull-left">
                <div class="sidebar-menu">
                    <Slide>
                        <a id="home" href="#">
                            <span>HOME</span>
                        </a>
                        <a id="register" href="#">
                            <span>REGISTER</span>
                        </a>
                    </Slide>
                </div>

                <div class="logo-wrap">
                    <b-img
                        src="~/assets/media/mobile-images/logo.png"
                        class="img-fluid"
                        alt="logo"
                    />
                </div>
            </div>
            <div class="pull-right">
                <!-- Form -->
                <form method="POST" action="#" class="my-form">
                    <button class="daftar hvr-wobble-skew" name="daftar"></button>
                    <button class="login hvr-wobble-skew" name="login"></button>
                    <!-- <input type="button" name="daftar" value="DAFTAR" />
                    <input type="button" name="login" value="LOGIN" />-->
                </form>
                <!-- /Form -->
            </div>
        </div>
        <div class="slide-wrap">
          <!-- Slide show -->
            <div class="slide">
                <!-- Start WOWSlider.com BODY section -->
                <div id="wowslider-container1">
                    <div class="ws_images">
                        <ul>
                            <li>
                                <a href="#">
                                    <img
                                        src="~/assets/media/mobile-images/slide/1.png"
                                    />
                                </a>
                            </li>
                            <li>
                                <img
                                    src="~/assets/media/mobile-images/slide/2.png"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- End WOWSlider.com BODY section -->
            </div>
            <!-- /Slide show -->
        </div>
    </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {
    layout: 'mobiletam',
    components: {
        Slide,
    },
}
</script>

<style>
</style>