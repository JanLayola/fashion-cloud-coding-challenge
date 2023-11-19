import Product from "../model/product";

const app = require('express')();

app.get('/getAll', async (req, res): Promise<void> => {
    try {
        const brands: string[] = await Product.distinct('brandName');
        res.status(200).json(brands);
    } catch {
        // todo: Improve the error handling
        res.status(500).json({ message: "Server internal error" });
    }

})

export default app;