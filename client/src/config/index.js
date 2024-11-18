export const registerFormControls=[
    {
        name:'userName',
        label:'User Name',
        placeholder:'Enter your user name',
        compoentType:'input',
        type:'text',
    },
    {
        name:'email',
        label:'Email',
        placeholder:'Enter your email',
        compoentType:'input',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'Enter your password',
        compoentType:'input',
        type:'password',
    }
];


export const loginFormControls=[
    {
        name:'email',
        label:'Email',
        placeholder:'Enter your email',
        compoentType:'input',
        type:'email',
    },
    {
        name:'password',
        label:'Password',
        placeholder:'Enter your password',
        compoentType:'input',
        type:'password',
    }
];


export const addProductFormElements = [
    {
      label: "Title",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter product title",
    },
    {
      label: "Description",
      name: "description",
      componentType: "textarea",
      placeholder: "Enter product description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "dog", label: "Dog" },
        { id: "cat", label: "Cat" },
        { id: "bird", label: "Bird" },
        { id: "fish", label: "Fish" },
        { id: "rabbit", label: "Rabbit" },
        { id: "hamster", label: "Hamster" },
      ],
    },
    {
      label: "Brand",
      name: "brand",
      componentType: "select",
      options: [
        { id: "royal-canin", label: "Royal Canin" },
        { id: "purina", label: "Purina" },
        { id: "hill's", label: "Hill's" },
        { id: "blue-buffalo", label: "Blue Buffalo" },
        { id: "orijen", label: "Orijen" },
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Enter product price",
    },
    {
      label: "Sale Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Enter sale price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Enter total stock",
    },
  ];
  