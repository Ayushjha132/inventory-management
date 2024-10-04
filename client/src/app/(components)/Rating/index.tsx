import {Star} from "lucide-react";


interface Rating {
    rating: number;
}

export default function Rating({rating}: Rating) {
    return [1, 2, 3, 4, 5].map((index) => (
        <Star
            key={index}
            color={index <= rating ? "#FFC107" : "#E4E5E9"}
            className="w-h h-4"/>
    ))
}