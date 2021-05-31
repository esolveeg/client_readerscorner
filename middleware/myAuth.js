
import http from "../repositories/Repository.js";
export default function (ctx) {
    if (!ctx.app.$auth.$state.loggedIn) {
      return ctx.app.$auth.redirect('login')
    } else {
        let err 
        http.get('user')
        .catch((e) => {
            return err = e.response.data
        })
        if (err) {
            console.log(err)
            console.log(ctx)
            return ctx.app.$auth.redirect('login')
        }
    }
}