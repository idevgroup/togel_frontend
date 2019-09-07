<template>
    <div>
        <b-row>
            <b-col class="text-center mb-3">
                <b-button-group>
                    <b-button :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/quickbet'}" variant="info">Quick Bet</b-button>
                    <b-button :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/4d3dbalik'}" variant="info">4D/3D Bolak Balik</b-button>
                    <b-button :to="{path:'/member/gamemarkets/'+$route.params.marketcode+'/bb_compuran'}" variant="info">BB Campuran</b-button>
                    <b-button variant="info">Quick 2D</b-button>
                    <b-button variant="info">4D Set</b-button>
                </b-button-group>
            </b-col>
        </b-row>
    </div> 
</template>

<script>
export default {}
</script>
