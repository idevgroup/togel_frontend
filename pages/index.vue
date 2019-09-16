<template>
    <div>
        <b-container fluid>
            <Slider></Slider>
            <div class="bg-lucky">
                <div class="wrapper">
                    <div class="pull-left">
                        <form action="" class="daftar-button-menu">
                            <input id="daftar-button-menu"  type="button" name="daftar" value="DAFTAR" />
                        </form>
                    </div>
                    <div class="center">
                        <div class="luck-number"></div>
                        <div class="luck-number-win-wrap">
                            <div class="luck-number-win mt-3"><span>1</span></div>
                            <div class="luck-number-win mt-3"><span>6</span></div>
                            <div class="luck-number-win mt-3"><span>8</span></div>
                            <div class="luck-number-win mt-3"><span>8</span></div>
                        </div>
                    </div>
                    <div class="pull-right">
                        <form action="" class="daftar-button-menu-right">
                            <input id="click-here-button-menu" type="button" name="clickhere" value="CLICK HERE" />
                        </form>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="win-round-wrap">
                <div class="wrapper">
                <carousel :autoplay="true" :nav="false" :loop="true" :items="5">
                   <div class="win-round">
                        <span>
                            <p class="pt-2">Cambodia</p>
                        </span>
                        <div class="cam-img" >
                            <div class="ml-3">
                                <img src="~assets/media/images/cam-win.png">
                            </div>
                            <span class="ml-3 mt-3" style="color: white; font-size: 10px;">CAM - 326</span>
                        </div>
                        <div class="mt-1">
                            <span class="ml-4 mt-5 win-number" style="">6677</span><br>
                            <span class="date-win ml-5 pt-3">23-07-2019</span>
                        </div>
                    </div>
                    <div class="win-round">
                        <span>
                            <p class="pt-2">Cambodia</p>
                        </span>
                        <div class="cam-img" >
                            <div class="ml-3">
                                <img src="~assets/media/images/cam-win.png">
                            </div>
                            <span class="ml-3 mt-3" style="color: white; font-size: 10px;">CAM - 326</span>
                        </div>
                        <div class="mt-1">
                            <span class="ml-4 mt-5 win-number" style="">6677</span><br>
                            <span class="date-win ml-5 pt-3">23-07-2019</span>
                        </div>
                    </div>
                       <div class="win-round">
                        <span>
                            <p class="pt-2">Cambodia</p>
                        </span>
                        <div class="cam-img" >
                            <div class="ml-3">
                                <img src="~assets/media/images/cam-win.png">
                            </div>
                            <span class="ml-3 mt-3" style="color: white; font-size: 10px;">CAM - 326</span>
                        </div>
                        <div class="mt-1">
                            <span class="ml-4 mt-5 win-number" style="">6677</span><br>
                            <span class="date-win ml-5 pt-3">23-07-2019</span>
                        </div>
                    </div>
                </carousel>
                </div>
            </div>
            <div class="clear"></div>
                <b-container>
                    <div class="row">
                        <div class="latest-wrap">
                            <div class="col-sm-12 col-md-4 latest-win-wrap">
                                <div class="latest-win pt-2">
                                    <div class="latest-win-title mb-1">
                                        <span>LINK ALTERNATIF</span>
                                    </div>
                                    <div class="latest-win-show">
                                        <div class="latest-win-show-link">
                                            <a href="#">
                                                350toto.com
                                            </a>
                                        </div>
                                    </div>
                                    <div class="latest-win-show">
                                        <div class="latest-win-show-link">
                                            <a href="#">
                                                350toto.city
                                            </a>
                                        </div>
                                    </div>
                                    <div class="latest-win-show">
                                        <div class="latest-win-show-link">
                                            <a href="#">
                                                350toto.fun
                                            </a>
                                        </div>
                                    </div>
                                    <div class="latest-win-show">
                                        <div class="latest-win-show-link">
                                            <a href="#">
                                                350toto.co
                                            </a>
                                        </div>
                                    </div>
                                    <div class="latest-win-show">
                                        <div class="latest-win-show-link">
                                            <a href="#">
                                                350toto.io
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-12 col-md-4 latest-win-wrap">
                                <div class="latest-win pt-2">
                                    <div class="latest-win-title mb-1">
                                        <span>LASTEST ROYAL FLUSH</span>
                                    </div>
                                    <div class="latest-win-show-flush">
                                        <div class="latest-win-flush-title">
                                            CAPENA***
                                        </div>
                                        <div class="latest-win-show-flush-number">
                                            10,000,000
                                        </div>
                                    </div>
                                    <div class="latest-win-show-flush">
                                        <div class="latest-win-flush">
                                            <div class="latest-win-flush-title">
                                                BOGANG***
                                            </div>
                                            <div class="latest-win-show-flush-number">
                                                5,000,000
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-flush">
                                        <div class="latest-win-flush">
                                            <div class="latest-win-flush-title">
                                                NAK***
                                            </div>
                                            <div class="latest-win-show-flush-number">
                                                1,000,000
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-flush">
                                        <div class="latest-win-flush">
                                            <div class="latest-win-flush-title">
                                                ZUN***
                                            </div>
                                            <div class="latest-win-show-flush-number">
                                                900,000
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-flush">
                                        <div class="latest-win-flush">
                                            <div class="latest-win-flush-title">
                                                DA***
                                            </div>
                                            <div class="latest-win-show-flush-number">
                                                500,000
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="col-sm-12 col-md-4 latest-win-wrap">
                                <div class="latest-win pt-2">
                                    <div class="latest-win-title mb-1">
                                        <span>LINK ALTERNATIF</span>
                                    </div>
                                    <div class="latest-win-show-withdraw">
                                        <div class="latest-win-withdraw">
                                            <div class="latest-win-show-withdraw-title">
                                                <span> MAMA***</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-accept">
                                                <span>ACCEPT</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-number">
                                                <span>RP 100,000</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-withdraw">
                                        <div class="latest-win-withdraw">
                                            <div class="latest-win-show-withdraw-title">
                                                <span>POKE***</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-accept">
                                                <span>ACCEPT</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-number">
                                                <span>RP 80,000</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-withdraw">
                                        <div class="latest-win-withdraw">
                                            <div class="latest-win-show-withdraw-title">
                                                <span> POE***</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-accept">
                                                <span>ACCEPT</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-number">
                                                <span>RP 60,000</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-withdraw">
                                        <div class="latest-win-withdraw">
                                            <div class="latest-win-show-withdraw-title">
                                                <span> AE***</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-accept">
                                                <span>ACCEPT</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-number">
                                                <span>RP 50,000</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="latest-win-show-withdraw">
                                        <div class="latest-win-withdraw">
                                            <div class="latest-win-show-withdraw-title">
                                                <span> E***</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-accept">
                                                <span>ACCEPT</span>
                                            </div>
                                            <div class="latest-win-show-withdraw-number">
                                                <span>RP 3,000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-container>
                <div class="clear"></div>
                <div class="content-wrap">
                    <div class="wrapper">
                        <div class="content-title">
                            <h1>Agen Togel Terpercaya, Bandar Togel Singapore, Togel Hongkong</h1>
                        </div>
                        <div class="content-sen">
                            <p>Jostoto adalah agen togel terpercaya di Indonesia melayani permainan togel Singapore, togel Hongkong, togel Sidney, limaloteria, Togel MGM dan Togel Saigon. Jika anda saat ini bingung menemukan bandar togel terpercaya, maka Jostoto
                            adalah jawaban atas permasalahan anda selama ini. Situs judi togel online Jostoto menyediakan informasi data SGP dan pengeluaran HK terupdate serta terakurat 2019. Bagi bosku yang ingin menemukan prediksi togel SGP hari ini,
                            seringlah berkunjung ke Jostoto. Customer service Jostoto online 24 jam non stop sehingga dapat membantu anda kapan pun dibutuhkan.
                            </p>
                        </div>
                        <div class="content-title">
                            <h1>Situs Agen Togel Terpercaya & Bandar Togel Online Menyediakan Keluaran SGP dan Data HK</h1>
                        </div>
                            <div class="content-sen">
                            <p>Jostoto berpengalaman selama 10 tahun dalam bidang judi togel online dan memiliki ribuan member aktif dan transaksi selalu meningkat. Banyak 
                                member Jostoto mencari info totobet SGP dan toto HK serta result SGP disini karena lengkap dan terbaik. Tak heran jika anda menganalisa dan 
                                mengecek brand value Jostoto saat ini sebesar 135 ribu di Google. Artinya sebanyak 135 ribu orang melakukan pencarian brand Jostoto melalui mesin 
                                pencari Google. Volume angka ini akan terus meningkat seiring berjalannya waktu. Jostoto terbukti membayar kemenangan anda dan kapan pun anda 
                                withdraw akan diproses selama bank online. Jika bank dalam kondisi offline, maka akan diproses di hari berikutnya atau setelah bank online. Kami 
                                menggunakan 6 bank ternama di Indonesia seperti BCA, MANDIRI, BNI, BRI, CIMB Niaga dan Danamon.
                            </p>
                        </div>
                        <div class="content-title">
                            <h1>Yuk Gabung Menjadi Member Agen Togel Terpercaya Jostoto</h1>
                        </div>
                    </div>
                    <div class="clear"></div>
                    <div class="copyright-wrap">
                        <div class="wrapper">
                            <div class="copyright">
                                <p>© Copyright 2019 350ToTo. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
        </b-container>
    </div>
</template>

<script>
import Slider from '~/components/partials/Slider'
import carousel from 'vue-owl-carousel'
export default {
	components: {
		Slider,
		carousel,
	},
}
</script>

<style>
.owl-item {
	width: 199px !important;
}
.owl-theme .owl-dots .owl-dot {
	display: none !important;
}
</style>
