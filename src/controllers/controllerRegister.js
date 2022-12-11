const Login = require('../models/RegisterLogin');


exports.index = (req,res, next) => {
    res.render('register', {title: 'Register'});
    next();
}



exports.register = async (req, res, next) => {
   try{
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function () {
            return res.redirect('/register');
        });
        return;
    }

    req.flash('success', 'Seu usuario foi criado com sucessso');
    req.session.save(function () {
        return res.redirect('/login');
    });
   }catch(e){
    console.log(e)
    return res.render('404');
   }

}





