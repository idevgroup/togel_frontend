import swal from 'sweetalert2'

export default function({ $axios, store, app, redirect, $option }) {
    $axios.onRequest(request => {
        const token = ''
        if (token) {
            request.headers.common.Authorization = `Bearer ${token}`
        }
        return request
    })

    /**
     * middleware for response
     */
    $axios.onResponse(response => {
        if (!response) {
            swal.fire('No data', 'No response data.', 'warning')
        }
        return response
    })

    $axios.onError(error => {
        if (!error.response) {
            // swal.fire('Error', '.Oops... Something went wrong', 'error')
            // this.$store.commit('todos/add', e.target.value)
            app.$auth.reset()
            app.$auth.logout()
            return
        }
        const { status } = parseInt(error.response && error.response.status)
            // Error 402
        if (status === 422) {
            const obj = error.response.data.errors
            const arr = []
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const element = obj[key]
                    arr.push(element)
                }
            }
            swal.fire({
                type: 'warning',
                title: 'Invalid input.',
                text: arr.join(' '),
            })
        } else if (status === 401) {
            app.$auth.reset()
            app.$auth.logout()
            console.log(store)
            console.log(app)
            console.log($option)
        } else if (status === 403) {
            redirect('/errors/403')
        } else if (status >= 500) {
            app.$auth.reset()
            app.$auth.logout()
            swal.fire('Error', 'Something went wrong.', 'error')
        } else {
            app.$auth.reset()
            app.$auth.logout()
        }
    })
}