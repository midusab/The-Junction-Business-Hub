import {useCallback, useEffect, useState} from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  APIProvider,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin} from 'lucide-react';
import {BUSINESS_INFO} from '../data/hubData';

const SEARCH_QUERIES = [
  'The Junction Laundry And Services Hub, Junction-Kodoyo, Homa Bay, Kenya',
  'Junction Kodoyo, Homa Bay, Kenya',
  'Homa Bay Rongo Road, Homa Bay, Kenya',
];

function getMapsApiKey() {
  if (import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  }
  if (typeof __GOOGLE_MAPS_API_KEY__ !== 'undefined' && __GOOGLE_MAPS_API_KEY__) {
    return __GOOGLE_MAPS_API_KEY__;
  }
  return '';
}

function isQuotaError(err) {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('QuotaExceededError') ||
    msg.includes('OverQuotaMapError') ||
    msg.includes('429')
  );
}

function MapFallbackCard({message}) {
  return (
    <div className="h-[300px] sm:h-[420px] w-full rounded-lg border border-sky-200 bg-sky-50/70 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
      <div className="w-12 h-12 rounded-md bg-white border border-sky-200 flex items-center justify-center mb-4 text-sky-700">
        <MapPin className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <h4 className="font-display text-lg font-semibold text-slate-900 mb-2">
        {BUSINESS_INFO.locationShort}
      </h4>
      <p className="text-sm text-slate-600 max-w-sm mb-5 leading-relaxed">
        {message}
      </p>
      <a
        href={BUSINESS_INFO.mapsExternalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
      >
        <span>Open in Google Maps</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

function HubMapCanvas() {
  const placesLib = useMapsLibrary('places');
  const apiStatus = useApiLoadingStatus();
  const [resolvedPlace, setResolvedPlace] = useState(null);
  const [lookupError, setLookupError] = useState(null);
  const [isSearching, setIsSearching] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  const handleCloseInfo = useCallback(() => setInfoOpen(false), []);

  useEffect(() => {
    if (apiStatus === APILoadingStatus.AUTH_FAILURE) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      setLookupError('Google Maps could not be authenticated in this preview. Use the direct map link below.');
      setIsSearching(false);
      return;
    }
    if (apiStatus === APILoadingStatus.FAILED) {
      setLookupError('Unable to load the interactive map right now. Open Google Maps directly for directions.');
      setIsSearching(false);
      return;
    }
  }, [apiStatus]);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function locateHub() {
      setIsSearching(true);
      setLookupError(null);

      try {
        for (const query of SEARCH_QUERIES) {
          const {places} = await placesLib.Place.searchByText({
            textQuery: query,
            fields: ['displayName', 'location', 'formattedAddress'],
            region: 'ke',
            language: 'en',
            maxResultCount: 1,
          });

          const match = places?.[0];
          if (match?.location) {
            if (!cancelled) {
              setResolvedPlace({
                lat: match.location.lat(),
                lng: match.location.lng(),
                displayName: match.displayName || BUSINESS_INFO.name,
                formattedAddress:
                  match.formattedAddress ||
                  `${BUSINESS_INFO.locationShort}, ${BUSINESS_INFO.locationReference}`,
                attributions: match.attributions?.map(
                  (a) => ({
                    provider: a.provider || '',
                    providerURI: a.providerURI || null,
                  })
                ),
              });
              setIsSearching(false);
            }
            return;
          }
        }

        if (!cancelled) {
          setLookupError(
            'Junction-Kodoyo along Homa Bay–Rongo Road, Homa Bay County. Open Google Maps for turn-by-turn directions.'
          );
          setIsSearching(false);
        }
      } catch (err) {
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        if (!cancelled) {
          setLookupError(
            'Interactive map preview is currently unavailable. Open Google Maps directly for directions to Junction-Kodoyo.'
          );
          setIsSearching(false);
        }
      }
    }

    void locateHub();

    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  if (lookupError) {
    return <MapFallbackCard message={lookupError} />;
  }

  if (isSearching || !resolvedPlace) {
    return (
      <div className="h-[300px] sm:h-[420px] w-full rounded-lg border border-sky-200 bg-sky-50/70 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-sky-200 border-t-sky-600 animate-spin mb-3" />
        <p className="text-sm text-slate-600">
          Locating Junction-Kodoyo on Homa Bay–Rongo Road...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="h-[300px] sm:h-[420px] w-full rounded-lg overflow-hidden border border-sky-200 bg-sky-50">
        <GoogleMap
          mapId="DEMO_MAP_ID"
          defaultCenter={{lat: resolvedPlace.lat, lng: resolvedPlace.lng}}
          defaultZoom={14}
          gestureHandling="cooperative"
          mapTypeControl={false}
          streetViewControl={false}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{width: '100%', height: '100%'}}
        >
          <AdvancedMarker
            ref={markerRef}
            position={{lat: resolvedPlace.lat, lng: resolvedPlace.lng}}
            title={BUSINESS_INFO.name}
            onClick={() => setInfoOpen((prev) => !prev)}
          >
            <Pin
              background="#1e90ff"
              borderColor="#0f72d8"
              glyphColor="#ffffff"
              scale={1.15}
            />
          </AdvancedMarker>

          {infoOpen && marker && (
            <InfoWindow
              anchor={marker}
              maxWidth={260}
              onCloseClick={handleCloseInfo}
            >
              <div className="p-1 text-slate-900">
                <p className="font-semibold text-sm leading-snug mb-1">
                  {BUSINESS_INFO.name}
                </p>
                <p className="text-xs text-slate-600 mb-2">
                  {resolvedPlace.formattedAddress}
                </p>
                <a
                  href={BUSINESS_INFO.mapsExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:underline"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {resolvedPlace.attributions && resolvedPlace.attributions.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {resolvedPlace.attributions.map((attr, idx) =>
            attr.providerURI ? (
              <a
                key={idx}
                href={attr.providerURI}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-700"
              >
                {attr.provider}
              </a>
            ) : (
              <span key={idx}>{attr.provider}</span>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function LocationMap() {
  const apiKey = getMapsApiKey();

  if (!apiKey) {
    return (
      <MapFallbackCard message="Located in Junction-Kodoyo along the Homa Bay–Rongo Road, Homa Bay County, Kenya." />
    );
  }

  return (
    <APIProvider
      apiKey={apiKey}
      libraries={['marker', 'places']}
      language="en"
      region="KE"
    >
      <HubMapCanvas />
    </APIProvider>
  );
}
