export const generateSneakerCard = ({
  name,
  price,
  imageURL,
}: sneakerEntity) => {
  return `<div>
    <img
      src="${imageURL}"
      alt=""
      class="rounded-xl aspect-square w-full object-center"
    />
    <p class="font-bold text-lg truncate mt-2">
      ${name}
    </p>
    <p class="font-semibold text-sm mt-1">$${price}</p>
  </div>`;
};
