import { useState } from "react";
import { addProduct } from "../../service/product";

const Create=()=>{
    const [product, setProduct] = useState({
        title: '',
        description: '',
        imagePost: '',
        image: '',
        category: ''
    });

    const [category,setCategory] = useState('');

    const handleCategory=(e:any)=>{
        setCategory(e.target.value);
    }

    const createProduct = async () => {
        let isValid = true;
      if(product.title.length<3 || product.title.length>60){
        isValid = false;
        alert('Title must be between 3 and 60 characters');
      }

      if(product.description.length<10 || product.description.length>1500){
        isValid = false;
        alert('Description must be between 10 and 1500 characters');
      } 
      if(!isValid){
        return;
      }
    await addProduct(
            product.title,
            product.description,
            product.imagePost,
            product.image,
            category
        );

        setProduct({
            title: '',
            description: '',
            imagePost: '',
            image: '',
            category: ''
        });
        setCategory('');
        alert('Product created successfully');

}
    return (
        <div className="create-product">
            <h1>Create Product</h1>
            <input
                type="text"
                placeholder="Title"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
            <input
                type="text"
                placeholder="Image Post URL"
                value={product.imagePost}
                onChange={(e) => setProduct({ ...product, imagePost: e.target.value })}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={product.image}
                onChange={(e) => setProduct({ ...product, image: e.target.value })}
            />
            <select value={category} onChange={handleCategory}>
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
            </select>
            <button onClick={createProduct}>Create Product</button>
        </div>
    );
}
export default Create;