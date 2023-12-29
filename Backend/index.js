import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'
const stripe=new Stripe('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX')

const app = express();
app.use(express.json());
app.use(cors());
app.post("/create-payment-intent", async (req, res) => {
  const { items,amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount:amount,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

//http://localhost:1000
// app.post('/',(req,res)=>{
//     console.log(req.body)
//     res.status(200).json("hello from server")
// })

const PORT=1000
app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));