<template>
    <div>
        <div id="app">
            <div id="page-wrap">
                <!-- id="app" ref="app" -->
                <div class="wrapper header">
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
                                src="~/assets/media/mobile-images/homepage/logo1.png"
                                class="img-fluid"
                                alt="logo" />
                        </div>
                    </div>
                    <div class="pull-right">
                      
                        <form
                            method="POST"
                            action="#"
                            class="my-form">
                            <button class="daftar hvr-wobble-skew" name="daftar"></button>
                            <button class="login hvr-wobble-skew" name="login"></button>
                           
                        </form>
                       
                    </div>
                </div>
                <div class="clear"></div>
                <div class="wrapper slide-wrap-mobile">
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

                <div class="clear"></div>
                <div class="wrapper lucky-wrap-mobile">
                    <div class="bg-lucky-mobile">
                   
                        <div class="wrapper-mobile-lucky-mobile">
                            <div class="pull-left">
                                <form action class="daftar-button-menu-mobile">
                                    <button class="daftar-button-mobile hvr-wobble-skew" name="daftar-mobile"></button>
                                </form>
                            </div>
                            <div class="center-mobile">
                                <div class="luck-number-mobile"></div>
                                <div class="luck-number-win-wrap-mobile">
                                    <div class="luck-number-win-mobile">
                                        <span>1</span>
                                    </div>
                                    <div class="luck-number-win-mobile">
                                        <span>6</span>
                                    </div>
                                    <div class="luck-number-win-mobile">
                                        <span>8</span>
                                    </div>
                                    <div class="luck-number-win-mobile">
                                        <span>8</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pull-right">
                                <form action>
                                    <button class="click-btn-mobile hvr-wobble-skew" name="click-mobile"></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="clear"></div>
                <div class="win-round-wrap-mobile">
                    <div class="wrapper wrapper-mobile-win-round">
                        <carousel
                            :autoplay="false"
                            :nav="false"
                            :loop="true"
                            :items="4">
                            <div class="win-round-mobile">
                                <span>
                                    <p>Cambodia</p>
                                </span>
                                <div class="country-img-mobile">
                                    <div class="country-img">
                                        <img src="~assets/media/mobile-images/homepage/country.png" />
                                    </div>
                                    <span class="country-title">CAM - 326</span>
                                </div>
                                <div class="wrap-result-mobile">
                                    <span class="win-number-mobile">6688</span>
                                    <br />
                                    <span class="date-win-mobile">23-07-2019</span>
                                </div>
                            </div>
                            <div class="win-round-mobile">
                                <span>
                                    <p>Cambodia</p>
                                </span>
                                <div class="country-img-mobile">
                                    <div class="country-img">
                                        <img src="~assets/media/mobile-images/homepage/country.png" />
                                    </div>
                                    <span class="country-title">CAM - 326</span>
                                </div>
                                <div class="wrap-result-mobile">
                                    <span class="win-number-mobile">6688</span>
                                    <br />
                                    <span class="date-win-mobile">23-07-2019</span>
                                </div>
                            </div>
                            <div class="win-round-mobile">
                                <span>
                                    <p>Cambodia</p>
                                </span>
                                <div class="country-img-mobile">
                                    <div class="country-img">
                                        <img src="~assets/media/mobile-images/homepage/country.png" />
                                    </div>
                                    <span class="country-title">CAM - 326</span>
                                </div>
                                <div class="wrap-result-mobile">
                                    <span class="win-number-mobile">6688</span>
                                    <br />
                                    <span class="date-win-mobile">23-07-2019</span>
                                </div>
                            </div>
                            <div class="win-round-mobile">
                                <span>
                                    <p>Cambodia</p>
                                </span>
                                <div class="country-img-mobile">
                                    <div class="country-img">
                                        <img src="~assets/media/mobile-images/homepage/country.png" />
                                    </div>
                                    <span class="country-title">CAM - 326</span>
                                </div>
                                <div class="wrap-result-mobile">
                                    <span class="win-number-mobile">6688</span>
                                    <br />
                                    <span class="date-win-mobile">23-07-2019</span>
                                </div>
                            </div>
                        </carousel>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="wrapper lastest-wrap-mobile">
                    <!-- Start LINK ALTERNATIF -->
                    <div class="link-wrap-mobile">
                        <div class="lastest-wrap-title-mobile">
                            <span>
                                <p>LINK ALTERNATIF</p>
                            </span>
                        </div>
                        <div class="link-wrap-body-mobile">
                            <div class="bg-link-body-title">
                                <span>
                                    <p>350toto.com</p>
                                </span>
                            </div>
                            <div class="bg-link-body-title">
                                <span>
                                    <p>350toto.city</p>
                                </span>
                            </div>
                            <div class="bg-link-body-title">
                                <span>
                                    <p>350toto.fun</p>
                                </span>
                            </div>
                            <div class="bg-link-body-title">
                                <span>
                                    <p>350toto.co</p>
                                </span>
                            </div>
                            <div class="bg-link-body-title">
                                <span>
                                    <p>350toto.io</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- END LINK ALTERNATIF -->

                    <!-- Start ROYAL FLUSH -->
                    <div class="link-wrap-mobile">
                        <div class="lastest-wrap-title-mobile">
                            <span>
                                <p>LASTEST ROYAL FLUSH</p>
                            </span>
                        </div>
                        <div class="link-wrap-body-mobile">
                            <div class="bg-royal-mobile">
                                <div class="latest-win-flush-name-mobile">
                                    <span>
                                        <p>CAPENA***</p>
                                    </span>
                                </div>
                                <div class="latest-win-flush-result-mobile">
                                    <span>
                                        <p>10,000,000</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-royal-mobile">
                                <div class="latest-win-flush-name-mobile">
                                    <span>
                                        <p>BOGANG***</p>
                                    </span>
                                </div>
                                <div class="latest-win-flush-result-mobile">
                                    <span>
                                        <p>5,000,000</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-royal-mobile">
                                <div class="latest-win-flush-name-mobile">
                                    <span>
                                        <p>NAK***</p>
                                    </span>
                                </div>
                                <div class="latest-win-flush-result-mobile">
                                    <span>
                                        <p>1,000,000</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-royal-mobile">
                                <div class="latest-win-flush-name-mobile">
                                    <span>
                                        <p>ZUN***</p>
                                    </span>
                                </div>
                                <div class="latest-win-flush-result-mobile">
                                    <span>
                                        <p>900,000</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-royal-mobile">
                                <div class="latest-win-flush-name-mobile">
                                    <span>
                                        <p>DA***</p>
                                    </span>
                                </div>
                                <div class="latest-win-flush-result-mobile">
                                    <span>
                                        <p>500,000</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End ROYAL FLUSH -->

                    <!-- Start WITHDRAW -->
                    <div class="withdraw-wrap-mobile">
                        <div class="lastest-wrap-title-mobile">
                            <span>
                                <p>LASTEST WITHDRAW</p>
                            </span>
                        </div>
                        <div class="withdraw-wrap-body-mobile">
                            <div class="bg-withdraw-mobile">
                                <div class="latest-withdraw-name-mobile">
                                    <span>
                                        <p>MAMA***</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-result-mobile">
                                    <span>
                                        <p>RP100,000</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-accept-mobile">
                                    <span>
                                        <p>ACCEPT</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-withdraw-mobile">
                                <div class="latest-withdraw-name-mobile">
                                    <span>
                                        <p>POKE***</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-result-mobile">
                                    <span>
                                        <p>RP80,000</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-accept-mobile">
                                    <span>
                                        <p>ACCEPT</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-withdraw-mobile">
                                <div class="latest-withdraw-name-mobile">
                                    <span>
                                        <p>POE***</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-result-mobile">
                                    <span>
                                        <p>RP60,000</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-accept-mobile">
                                    <span>
                                        <p>ACCEPT</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-withdraw-mobile">
                                <div class="latest-withdraw-name-mobile">
                                    <span>
                                        <p>AE***</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-result-mobile">
                                    <span>
                                        <p>RP50,000</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-accept-mobile">
                                    <span>
                                        <p>ACCEPT</p>
                                    </span>
                                </div>
                            </div>
                            <div class="bg-withdraw-mobile">
                                <div class="latest-withdraw-name-mobile">
                                    <span>
                                        <p>E***</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-result-mobile">
                                    <span>
                                        <p>RP3,000</p>
                                    </span>
                                </div>
                                <div class="latest-withdraw-accept-mobile">
                                    <span>
                                        <p>ACCEPT</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End ROYAL FLUSH -->
                </div>
                <div class="clear"></div>
                <div class="wrapper socail-wrap">
                    <div class="instagram-mobile">
                        <img src="~/assets/media/mobile-images/icons/instagram.png" />
                        <span>350TOTO</span>
                    </div>
                    <div class="whatapp-mobile">
                        <img src="~/assets/media/mobile-images/icons/whatsapp.png" />
                        <span>350TOTO</span>
                    </div>
                    <div class="fb-mobile">
                        <img src="~/assets/media/mobile-images/icons/fb.png" />
                        <span>350TOTO</span>
                    </div>
                    <div class="telegram-mobile">
                        <img src="~/assets/media/mobile-images/icons/telegram.png" />
                        <span>350TOTO</span>
                    </div>
                </div>

                <div class="clear"></div>
                <div class="wrapper app-download-wrap">
                    <div class="google-play">
                        <img src="~assets/media/mobile-images/homepage/google-play.png" />
                    </div>
                    <!-- <div class="mobile-desktop">
                <img src="~assets/media/mobile-images/homepage/mobile-desktop.png" />
            </div> -->
                    <div class="appStore">
                        <img src="~assets/media/mobile-images/homepage/appStore.png" />
                    </div>
                </div>
                <div class="clear"></div>
                <div class="wrapper content">
                    <div class="content-text">
                        <h1>Agen Togel Terpercaya, Bandar Togel Singapore, Togel Hongkong</h1>
                        <p>
                            Jostoto adalah agen togel terpercaya di Indonesia melayani permainan togel Singapore, togel Hongkong, togel Sidney, limaloteria, Togel MGM dan Togel
                            Saigon. Jika anda saat ini bingung menemukan bandar togel terpercaya, maka Jostoto adalah jawaban atas permasalahan anda selama ini. Situs judi
                            togel online Jostoto menyediakan informasi data SGP dan pengeluaran HK terupdate serta terakurat 2019. Bagi bosku yang ingin menemukan prediksi
                            togel SGP hari ini, seringlah berkunjung ke Jostoto. Customer service Jostoto online 24 jam non stop sehingga dapat membantu anda kapan pun
                            dibutuhkan.
                        </p>
                        <h1>Situs Agen Togel Terpercaya & Bandar Togel Online Menyediakan Keluaran SGP dan Data HK</h1>
                        <p>
                            Jostoto berpengalaman selama 10 tahun dalam bidang judi togel online dan memiliki ribuan member aktif dan transaksi selalu meningkat. Banyak
                            member Jostoto mencari info totobet SGP dan toto HK serta result SGP disini karena lengkap dan terbaik. Tak heran jika anda menganalisa dan
                            mengecek brand value Jostoto saat ini sebesar 135 ribu di Google. Artinya sebanyak 135 ribu orang melakukan pencarian brand Jostoto melalui mesin
                            pencari Google. Volume angka ini akan terus meningkat seiring berjalannya waktu. Jostoto terbukti membayar kemenangan anda dan kapan pun anda
                            withdraw akan diproses selama bank online. Jika bank dalam kondisi offline, maka akan diproses di hari berikutnya atau setelah bank online. Kami
                            menggunakan 6 bank ternama di Indonesia seperti BCA, MANDIRI, BNI, BRI, CIMB Niaga dan Danamon.
                        </p>
                        <h1>Yuk Gabung Menjadi Member Agen Togel Terpercaya Jostoto</h1>
                    </div>
                </div>
                <div class="clear"></div>
                <div class="wrapper footer-mobile">
                    <div class="copyright-mobile">
                        <h1>© Copyright 2019 350ToTo. All Rights Reserved.</h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="wrapper footer-menu-mobile">
            <div class="buku-mobile">
                <img src="~assets/media/mobile-images/homepage/buku.png" />
                <h1>BUKU MIMIPI</h1>
            </div>
            <div class="buku-mobile">
                <img src="~assets/media/mobile-images/homepage/peraturan.png" />
                <h1>PERATURAN</h1>
            </div>
            <div class="buku-mobile">
                <img src="~assets/media/mobile-images/homepage/promo.png" />
                <h1>PROMO</h1>
            </div>
            <div class="buku-mobile">
                <img src="~assets/media/mobile-images/homepage/kontak.png" />
                <h1>KONTAK</h1>
            </div>
        </div>
    </div>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import carousel from 'vue-owl-carousel'
// import Slider from '@jeremyhamm/vue-slider'
export default {
	layout: ({ isMobile }) => (isMobile ? 'mobiletam' : 'default'),

	components: {
		Slide,
		// slider: Slider,
		carousel,
	},
	head() {
		return {
			link: [
				{
					rel: 'stylesheet',
					href: require('assets/media/css/mobile.css'),
				},
			],
		}
	},
}
</script>
