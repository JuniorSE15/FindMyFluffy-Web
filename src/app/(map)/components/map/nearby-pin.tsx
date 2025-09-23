import { DivIcon, LatLng } from 'leaflet';
import { Popup, Marker } from 'react-leaflet';
import { Button } from '@/components/ui/button';

interface NearbyPinProps {
  id: number;
  position: LatLng;
  imageUrl: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  date: string;
}

export const NearbyPin: React.FC<NearbyPinProps> = ({
  id,
  position,
  imageUrl,
  type,
  title,
  description,
  date,
}) => {
  const createCustomImageIcon = (imageUrl: string, type: 'lost' | 'found') => {
    const borderColor = type === 'lost' ? '#ef4444' : '#10b981';

    return new DivIcon({
      html: `
          <div style="
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 3px solid ${borderColor};
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            position: relative;
            overflow: hidden;
          ">
            <img src="${imageUrl}" style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            " />
            <div style="
              position: absolute;
              bottom: -8px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 8px solid transparent;
              border-right: 8px solid transparent;
              border-top: 8px solid ${borderColor};
            "></div>
          </div>
        `,
      className: 'custom-image-marker',
      iconSize: [50, 58],
      iconAnchor: [25, 58],
      popupAnchor: [0, -58],
    });
  };
  return (
    <Marker
      key={id}
      position={position}
      icon={createCustomImageIcon(imageUrl, type)}
    >
      <Popup>
        <div className='w-[150px]'>
          <div
            className={`mb-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              type === 'lost'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            <span>{type === 'lost' ? 'Lost' : 'Found'}</span>
          </div>
          <h3 className='text-primary-text mb-1 text-sm font-semibold'>
            {title}
          </h3>
          <p className='text-secondary-text mb-2 text-xs'>{description}</p>
          <div className='text-secondary-text text-xs'>{date}</div>
          <Button
            size='sm'
            className='bg-primary-bg hover:bg-primary-bg/80 mt-2 rounded-full'
          >
            View Details
          </Button>
        </div>
      </Popup>
    </Marker>
  );
};
