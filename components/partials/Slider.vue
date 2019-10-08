<template>
    <div>
        <b-row class="slide-mt mr-0 ml-0 d-none d-sm-none d-md-block d-lg-block">
            <!-- Slide show -->
            <div class="slide">
                <!-- Start WOWSlider.com BODY section -->
                <div id="wowslider-container1">
                    <div class="ws_images">
                        <ul>
                            <li>
                                <a href="#">
                                    <img
                                        src="~/assets/media/images/slideshows/1.png"
                                    />
                                </a>
                            </li>
                            <li>
                                <img
                                    src="~/assets/media/images/slideshows/2.png"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- End WOWSlider.com BODY section -->
            </div>
            <!-- /Slide show -->
        </b-row>
         <div class="slide-wrap-mobile d-block d-sm-block d-md-none d-lg-none">
                    <div class="slide-wrap">                      
                        <div class="slide">                          
                            <div id="wowslider-container1">
                                <div class="ws_images">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <img src="~/assets/media/mobile-images/slide/1.png" />
                                            </a>
                                        </li>
                                        <li>
                                            <img src="~/assets/media/mobile-images/slide/2.png" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                         
                        </div>
                      
                    </div>
                </div>
    </div>
</template>
<script>
export default {}
</script>

<style>
.slide-mt {
	margin-top: -16px;
}
</style>