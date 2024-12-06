import diseaseAPI from '@/constants/disease.api';

export const findDisease = (diseaseName: string) => {
    return diseaseAPI.find((item) => item.label === diseaseName) || null;
}
