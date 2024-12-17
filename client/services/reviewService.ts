import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { IReviewReq, IReviewRes } from "@/types/IReview";

export const createReview = async (review: IReviewReq, authData: IAuthRes) => {
  try {
    const { data } = await axios.post<IApiRes<IReviewRes>>(`/review`, review, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error creating review: ", error);
    throw error;
  }
};
