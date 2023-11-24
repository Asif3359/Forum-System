import { useForm } from "react-hook-form"

const AddPost = () => {



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div>
            <div className="mt-10 mb-10">
                <h1 className="text-4xl">Add Your Post</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-2  ">
                    <select required {...register("tag",  { required: true })}  className=" border rounded-lg p-2">
                        <option value="">Default</option>
                        <option value="tag1">tag1</option>
                        <option value="tag2">tag2</option>
                        <option value="tag3">tag3</option>
                    </select>
                    {errors.tag && <span>This field is required</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor='title'>Title</label>
                    <input id='title' type="text" required  {...register("title", { required: true })} className="border rounded-lg p-2" placeholder="title" />
                    {errors.title && <span>This field is required</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor='description'>Description</label>
                    <textarea  required type="text" {...register("description", { required: true })} className="border rounded-lg p-2 h-40" placeholder="Description" />
                    {errors.description && <span>This field is required</span>}
                </div>
                <input className="btn btn-sm w-full" type="submit" />
            </form>
        </div>
    );
};

export default AddPost;