const notFound = (req, res) => {
    res.status(404).send("Page Not Found 404 !");
}

module.exports = notFound;