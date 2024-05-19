import { useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";

const HotelsPage = () => {

    const [images,] = useState([
        "https://s3-alpha-sig.figma.com/img/5037/1a96/334566803414e500d5823b7e567be02b?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IwnesY-Wn6O7uL54Tn4U6WuBYMdpuR7jMal5elmM4FfhmUmurJE9QlrMxPwhsZdq17-VMFweNzwWnJzsr3npXhCy3PSBYSxJ~5gLV~FIjfJoLtFoKVhDfuS2vzVhGHqFRKpRtEv-AOesmtaQgjp6j8yWQHw~X9RF7VSISioZX3fVxO9x8vuQG~UhLMqcRXO9EYaREkjJS1~L5sRn-sAqW23nSbCnkQJngPJzS4Hy48DZ19Ar6kGkB8BrDvUU2YjIbcWG9J1XIAtQ1YsJqhM~oflwoRzjCnga0u2sk6wDF8ZY1D3ITnyE1ttEQjnZcnXOKleKKq~uAq5AFZOh7qQXUQ__",
        "https://s3-alpha-sig.figma.com/img/d900/6223/94dc0005a7f80296ef2a2819e2aff896?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cAeBUbD38UODJ307QmwGjdZNcitaA5ZBVRdnpAn-EZJCkK834~1BDt2MZ08t7c34d2lv2jq~xnxMi4hft7X4MsEos86B5BePhdxy4Ksf0GsK40zeD1KZF2dJ6lQCRj27Tky7OPdC5IiR5Dba9IaoBv8MX2Df6qzHDbadpjVkqJRVsAVBLMYk~lszExNwmlHTiZdVP6hp8mj~2evysDLCZuJVSwbJqaIYi0AyjvfT5URMV5t70tppKHEx3Albjr5oUgdro4lsted2PZYFDrNd~SJqDRBz2GxEIlt0Z0GOu7g-tRBzviTJK9pHbMVUqxJeJHxDErw4yNaE5FmtB1CwFg__",
        "https://s3-alpha-sig.figma.com/img/d673/d7e0/580c54cece3e163db0caf3cae8f5ac17?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZTzIQp3ekmL5bElPW-PzrcFjvDNMC1capBC9szTmLMUkJUXRCkBDewssKRrnP~IDDtgsdZQNvDCLy8iQI7l5QalKDrjTLj4zThHcSxj0wFb-XWgMECQki04BkKpAeZ~0tZ3VcYg6vdwM6z5iKP4EUmc~tSO2fwp6d2kkjZety8vgdKS6cTg-oi775gA~wk7BmQvPSZR~9ul2avIbbQJBx9-6D1VzEd5H33Xh891-In8Qs5bQUjNI8LCeBOfALeaFDQ3nTrNara2KKHpvMjrbGa23gd1kljGPiTQMqbCFiqBym95FPBsYp3RQL0lN4MQ535p-6ReXMQ9lvfK19JqkDw__",
        "https://s3-alpha-sig.figma.com/img/d673/d7e0/580c54cece3e163db0caf3cae8f5ac17?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZTzIQp3ekmL5bElPW-PzrcFjvDNMC1capBC9szTmLMUkJUXRCkBDewssKRrnP~IDDtgsdZQNvDCLy8iQI7l5QalKDrjTLj4zThHcSxj0wFb-XWgMECQki04BkKpAeZ~0tZ3VcYg6vdwM6z5iKP4EUmc~tSO2fwp6d2kkjZety8vgdKS6cTg-oi775gA~wk7BmQvPSZR~9ul2avIbbQJBx9-6D1VzEd5H33Xh891-In8Qs5bQUjNI8LCeBOfALeaFDQ3nTrNara2KKHpvMjrbGa23gd1kljGPiTQMqbCFiqBym95FPBsYp3RQL0lN4MQ535p-6ReXMQ9lvfK19JqkDw__",
        // "https://s3-alpha-sig.figma.com/img/09bb/381d/c9704bb34aa79ea8b0cba95828d32332?Expires=1716768000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dXU9l~-6SbImr7QDW71lterC3o2ZR3snF5OD9MTi0FAjSrScptdpKbJqLxQmiVqJN5wE7cmVoqqzODuPizIZedXJDnu6FD9WkC4Sm-FPhsqXwLGaxEVcqHafc4m-O-hf-yXxAz4lGOKhza2cDTtSOLl7AD67ClgL2Cmuq8BWGoykHv1KOpRxZhhM7EQAKJaTazGA4L7UdNGTPyWMOD96YjNYNDUWL4PKk5hMLkliNzNEAp-jj5NtGsAhMUDf-mPWEVUMU16AzeQzizDu5lVlUuKTkIPGAusJix8q2PNm15qosSUVrzKQpKOm8uA~Mq870aQE~xSIH7DBWyQVilDL4g__"
    ]);

    return (
        <div className="m-5 pr-10  p-5 rounded-lg bg-white w-full  ">
            <ImageGallery images={images} />
            <div className="my-5" >
                <div className="flex justify-between mb-3" >
                    <h1 className="text-2xl font-semibold" >Hilton Woodcliff Lake hotel</h1>
                    <Button className="font-semibold bg-[#415A77] text-white" >Reserve room</Button>
                </div>
                <div>
                    <p className="flex  items-center gap-2"> <CiLocationOn /> Sidi Gaber, Alexandria</p>
                    <div className="flex mt-2" >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar key={index} color="#FFCD6B" width={50} />
                        ))}
                        {Array.from({ length: 5 - 5 }).map((_, index) => (
                            <FaStar key={index} color="#F2F2F2" width={50} />
                        ))}
                    </div>
                    <div className="mt-2">
                        <h1 className="font-semibold">About Hotel</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe beatae officiis itaque? Temporibus voluptatibus iure tempora accusamus incidunt adipisci nesciunt explicabo excepturi sed eaque doloremque, velit cupiditate fugiat eligendi itaque? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet accusantium veritatis velit maiores totam quam, voluptate delectus architecto aliquid excepturi?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelsPage