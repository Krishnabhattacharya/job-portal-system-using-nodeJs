const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({
        success: false,
        message: "something went wong",
        err,
    })
}

export default errorMiddleware;