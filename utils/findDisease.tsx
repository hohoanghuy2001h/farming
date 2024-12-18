import diseaseAPI from '@/constants/disease.api';

export const findDisease = (diseaseName: string) => {
    return diseaseAPI.find((item) => item._id === diseaseName) || null;
}
