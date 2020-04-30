import * as React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
// import debounce from '../../utils/debounce';

type Props = ViewProps & {
  enabled: boolean;
  layout: { height: number };
  children: React.ReactNode;
};

// This component will render a page which overflows the screen
// if the container fills the window by comparing the size
// This lets the document.body handle scrolling of the content
// It's necessary for
export default React.forwardRef<View, Props>(function CardSheet(
  { enabled, layout, style, ...rest },
  ref
) {
  const [windowHeight, setWindowHeight] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.addEventListener) {
      // Only run when DOM is available
      return;
    }

    setWindowHeight(window.innerHeight);

    // We're only checking this on mount and not on window resize
    // On scrolling, browser will hide the URL bar which changes window size
    // So if we also check on window resize, we'll disable the hiding of URL bar
  }, []);

  return (
    <View
      {...rest}
      ref={ref}
      style={[
        enabled && layout.height === windowHeight ? styles.page : styles.card,
        style,
      ]}
    />
  );
});

const styles = StyleSheet.create({
  page: {
    minHeight: '100%',
  },
  card: {
    flex: 1,
    overflow: 'hidden',
  },
});
