<template>

     <div class="pre-header">
         <b-container>
            <b-row>
                 <b-col class="additional-shop-info">
                    <b-nav class="list-unstyled list-inline">
                        <b-nav-item><i class="fa fa-phone"></i><span>+1 456 6717</span></b-nav-item>
                        <b-nav-item><i class="fa fa-envelope-o"></i><span>info@keenthemes.com</span></b-nav-item>
                    </b-nav>
                 </b-col>    
                 <b-col class="additional-nav">
                     <template v-if="authenticated">
                         <b-nav class="pull-right">
                             <b-nav-item to="/member/dashboard">{{user.reg_remain_balance}}</b-nav-item>
                              <b-nav-item-dropdown
                                    id="my-nav-dropdown"
                                    :text="user.reg_name"
                                    toggle-class="nav-link-custom"
                                    right
                                    >
                                    <b-dropdown-item to="/member/dashboard">Dashboard</b-dropdown-item>
                                    <b-dropdown-divider></b-dropdown-divider>
                                    <b-dropdown-item  @click="logoutSubmit">Logout</b-dropdown-item>
                            </b-nav-item-dropdown>
                         </b-nav>    
                     </template>
                     <template v-else>
                        <b-nav class="list-unstyled list-inline pull-right">
                        <b-nav-item v-b-modal.modal-login> Log In</b-nav-item>
                        <b-nav-item v-b-modal.modal-register>Registration</b-nav-item>
                     </b-nav>
                     </template>
                    
                 </b-col>   
            </b-row>
         </b-container>
     </div>
    
</template>

<script>
export default {

    methods:{
       async logoutSubmit(){
        await this.$auth.logout()
        }
    }
};
</script>

<style>
</style>
