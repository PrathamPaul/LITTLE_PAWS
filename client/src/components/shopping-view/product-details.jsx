import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";


function ProductDetailsDialog({open,setOpen,productDetails}) {
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.auth)
  const {toast}=useToast();
  function handleAddtoCart(getCurrentProductId){
    console.log(getCurrentProductId)
    dispatch(addToCart({userId: user?.id, productId:getCurrentProductId, quantity:1}))
    .then((data)=>{
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    })
  }


    return ( 
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
            <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
        <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
                <StarIcon className="w-5 h-5 fill-primary"/>
            </div>
            <span className="text-muted-foreground">(4.5)</span>

          </div>
          <div className="mt-5 mb-5">
            <Button className="w-full"
            onClick={()=>handleAddtoCart(productDetails?._id)}
            >
                Add to Cart
            </Button>
          </div>
          <Separator/>
          </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;