import authRouter from "./auth"

const initRoutes = (app) => {

    app.use('/api/auth', authRouter)
    
    return app.use('/', (req, res) => {
        // console.log("Server onl")
        res.json("Sever onl...")
    })
}

export default initRoutes