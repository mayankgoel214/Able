import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import {
  Search,
  BookOpen,
  FolderOpen,
} from 'lucide-react-native';
import { Button, Card } from '../../componentsui';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';
import { Spacing, IconSize, BorderRadius } from '../../constants/spacing';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Find Trusted Experts',
    description:
      'Connect with verified therapists, counselors, and educators specializing in child development.',
    icon: <Search size={IconSize['3xl']} color={Colors.primary[600]} />,
    color: Colors.primary[600],
    bgColor: Colors.primary[100],
  },
  {
    id: '2',
    title: 'Personalized Guidance',
    description:
      'Get customized recommendations based on your child\'s unique needs and your family\'s situation.',
    icon: <BookOpen size={IconSize['3xl']} color={Colors.teal[600]} />,
    color: Colors.teal[600],
    bgColor: Colors.teal[100],
  },
  {
    id: '3',
    title: 'Organize Your Child\'s Plan',
    description:
      'Keep all important documents, IEPs, and progress reports in one secure, shareable place.',
    icon: <FolderOpen size={IconSize['3xl']} color={Colors.success.dark} />,
    color: Colors.success.dark,
    bgColor: Colors.success.light,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.push('/(auth)/language');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/language');
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => (
    <View style={styles.slide}>
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: currentIndex === index ? 1 : 0.5, scale: currentIndex === index ? 1 : 0.9 }}
        transition={{ type: 'timing', duration: 400 }}
        style={styles.slideContent}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
          {item.icon}
        </View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDescription}>{item.description}</Text>
      </MotiView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.skipButton} onPress={handleSkip}>
          Skip
        </Text>
      </View>

      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={slides}
          renderItem={renderSlide}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <MotiView
            key={index}
            animate={{
              width: currentIndex === index ? 24 : 8,
              backgroundColor:
                currentIndex === index ? Colors.primary[500] : Colors.gray[300],
            }}
            transition={{ type: 'timing', duration: 300 }}
            style={styles.dot}
          />
        ))}
      </View>

      {/* Feature Cards Preview */}
      <View style={styles.cardsPreview}>
        {slides.map((slide, index) => (
          <MotiView
            key={slide.id}
            animate={{
              opacity: currentIndex === index ? 1 : 0.4,
              scale: currentIndex === index ? 1.05 : 1,
            }}
            transition={{ type: 'timing', duration: 300 }}
          >
            <Card
              variant={currentIndex === index ? 'elevated' : 'default'}
              padding="small"
              style={styles.previewCard}
            >
              <View style={[styles.previewIcon, { backgroundColor: slide.bgColor }]}>
                {React.cloneElement(slide.icon as React.ReactElement<{ size: number }>, {
                  size: IconSize.sm,
                })}
              </View>
            </Card>
          </MotiView>
        ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Button
          title={currentIndex === slides.length - 1 ? 'Continue' : 'Next'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.base,
  },
  skipButton: {
    ...Typography.label,
    color: Colors.text.tertiary,
  },
  carouselContainer: {
    flex: 1,
  },
  slide: {
    width: width,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
  },
  slideContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  slideTitle: {
    ...Typography.h2,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  slideDescription: {
    ...Typography.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.base,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  cardsPreview: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  previewCard: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.base,
  },
  previewIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },
});
