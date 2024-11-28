
import { Bird, Cat, ChevronLeftIcon, ChevronRightIcon, Dog, Fish, Rat } from 'lucide-react';
import banner2 from '../../assets/banner2.webp'
import banner5 from '../../assets/banner5.webp'
import banner4 from '../../assets/banner4.webp'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import { useNavigate } from 'react-router-dom';
import ProductDetailsDialog from '@/components/shopping-view/product-details';



function ShoppingHome() {
    const slides=[banner4,banner5,banner2]
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const { productList,productDetails } = useSelector(
        (state) => state.shopProducts
      );
    const dispatch=useDispatch();
    const navigate=useNavigate();

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
          [section]: [getCurrentItem.id],
        };
    
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId));
    }
    

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
    
        return () => clearInterval(timer);
      }, []);

      
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

    const categoriesWithIcon=[
      { id: "dog", label: "Dog", icon:Dog },
      { id: "cat", label: "Cat",icon:Cat },
      { id: "bird", label: "Birds",icon:Bird },
      { id: "hamster", label: "Hamster",icon:Rat },
      { id: "fish", label: "Fishes" ,icon:Fish},
    ]

    const brandsWithIcon=[
      { id: "royal-canin", label: "Royal Canin" },
      { id: "purina", label: "Purina" },
      { id: "hill's", label: "Hill's" },
      { id: "blue-buffalo", label: "Blue Buffalo" },
      { id: "orijen", label: "Orijen" },
    ]
    return ( 
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[400px]">
                {
                    slides.map((slide, index) => (
                        <img
                          src={slide}
                          key={index}
                          className={`${ index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        />
                      ))
                }
                 <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + slides.length) %
                slides.length
            )
        }
          className=" absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % slides.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
        </div>

        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Shop By Category
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
            </div>
        </section>

        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Shop By Brands
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(brandItem, "brand")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <categoryItem.icon className="w-12 h-12 mb-4 text-primary" /> */}
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
            </div>
        </section>

        <section className="py-12">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList
              .slice(0, 8) 
              .map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    //handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
            </div>
            </div>
        </section>
        <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
        </div>
     );
}

export default ShoppingHome;