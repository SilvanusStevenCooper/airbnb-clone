"use client";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";
import { CldImage } from "next-cloudinary";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "MMMM-d-yyyy")} - ${format(end, "MMMM-d-yyyy")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div>
        <div
          className="
        aspect-square
        w-full
        relative
        overflow-hidden
        rounded-xl
        "
        >
          <CldImage
            width={600}
            height={600}
            sizes="100vw"
            alt="listing"
            src={data.imageSrc}
            className="
          object-cover
          h-full
          w-full
          group-hover:scale-110
          transition
          "
          />

          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div>
          <div className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </div>
          <div className="font-light text-neutral-500">
            {reservationDate || data.category}
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {price}</div>
            {!reservation && <div className="font-light"> per night</div>}
          </div>
        </div>

        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;