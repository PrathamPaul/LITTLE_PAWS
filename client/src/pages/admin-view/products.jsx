import ProductImageUpload from "@/components/admin-view/image-upload";
import Commonform from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "./product-tile";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    //averageReview: 0,
  };


function AdminProducts() {

    const [openCreateProductsDialog,setOpenCreateProductsDialog]= useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState,setImageLoadingState]= useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const {productList}=useSelector((state)=>state.adminProducts)

    const dispatch=useDispatch()
    const { toast } = useToast();
    function onSubmit(event){
        event.preventDefault();

        dispatch(addNewProduct({
            ...formData,
            image: uploadedImageUrl,
        })).then((data)=>{
            if (data?.payload?.success) {
                dispatch(fetchAllProducts());
                setOpenCreateProductsDialog(false);
                setImageFile(null);
                setFormData(initialFormData);
                toast({
                  title: "Product add successfully",
                }); 
            }
        })
            
    }


    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])

    console.log(productList,"productList");

    return ( 
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={()=>setOpenCreateProductsDialog(true)}>Add New Product</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                //handleDelete={handleDelete}
              />
            ))
          : null}
            </div>
                <Sheet open={openCreateProductsDialog}
                onOpenChange={()=>{
                    setOpenCreateProductsDialog(false);
                }}
                >
                    <SheetContent side="right" className="overflow-auto">
                        <SheetHeader>
                            <SheetTitle>
                                Add new Product
                            </SheetTitle>
                        </SheetHeader>
                        <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} currentEditedId={currentEditedId} />
                        <div className="py-6">
                            <Commonform  onSubmit={onSubmit} formData={formData} setFormData={setFormData} imageLoadingState={imageLoadingState}  buttonText="Add" 
                            formControls={addProductFormElements}/>
                        </div>
                    </SheetContent> 
                </Sheet>
        </Fragment>
     );
}

export default AdminProducts;


