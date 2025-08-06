# Card Component

A flexible, modular card component built with TypeScript, CVA (Class Variance Authority), and Tailwind CSS. The Card component provides multiple variants, sizes, and design options for creating consistent, accessible card layouts.

## Features

- 🎨 **Multiple Variants**: Default, elevated, outlined, ghost, and interactive
- 📏 **Flexible Sizing**: Small, default, large, and extra-large sizes
- 🔄 **Design Options**: Default, curved, rounded, and square designs
- 🌙 **Dark Mode Support**: Built-in dark mode styling
- ♿ **Accessible**: Proper ARIA attributes and keyboard navigation
- 🧩 **Modular**: Composable sub-components for different card sections
- 🎯 **TypeScript**: Full type safety with proper interfaces

## Components

The Card component consists of several sub-components:

- `Card` - Main container
- `CardHeader` - Header section with title and description
- `CardTitle` - Card title
- `CardDescription` - Card description text
- `CardContent` - Main content area
- `CardFooter` - Footer section with actions
- `CardImage` - Image with aspect ratio controls

## Basic Usage

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/card";

// Basic card with all sections
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the main content of the card.</p>
  </CardContent>
  <CardFooter>
    <p>Footer content</p>
  </CardFooter>
</Card>
```

## Variants

### Default
```tsx
<Card variant="default">
  <CardContent>Default card with border</CardContent>
</Card>
```

### Elevated
```tsx
<Card variant="elevated">
  <CardContent>Card with shadow and hover effects</CardContent>
</Card>
```

### Outlined
```tsx
<Card variant="outlined">
  <CardContent>Transparent card with border</CardContent>
</Card>
```

### Ghost
```tsx
<Card variant="ghost">
  <CardContent>Transparent card with hover background</CardContent>
</Card>
```

### Interactive
```tsx
<Card variant="interactive" onClick={() => console.log('Card clicked')}>
  <CardContent>Clickable card with hover and active states</CardContent>
</Card>
```

## Sizes

### Small
```tsx
<Card size="sm">
  <CardContent>Small card with minimal padding</CardContent>
</Card>
```

### Default
```tsx
<Card size="default">
  <CardContent>Default size card</CardContent>
</Card>
```

### Large
```tsx
<Card size="lg">
  <CardContent>Large card with more padding</CardContent>
</Card>
```

### Extra Large
```tsx
<Card size="xl">
  <CardContent>Extra large card with maximum padding</CardContent>
</Card>
```

## Design Options

### Default
```tsx
<Card design="default">
  <CardContent>Default rounded corners</CardContent>
</Card>
```

### Curved
```tsx
<Card design="curved">
  <CardContent>More curved corners</CardContent>
</Card>
```

### Rounded
```tsx
<Card design="rounded">
  <CardContent>Fully rounded corners</CardContent>
</Card>
```

### Square
```tsx
<Card design="square">
  <CardContent>No rounded corners</CardContent>
</Card>
```

## Card with Image

```tsx
import { CardImage } from "@/components/card";

<Card>
  <CardImage
    src="/path/to/image.jpg"
    alt="Card image"
    aspectRatio="video"
  />
  <CardHeader>
    <CardTitle>Card with Image</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content below the image</p>
  </CardContent>
</Card>
```

### Image Aspect Ratios

- `square` - 1:1 aspect ratio
- `video` - 16:9 aspect ratio (default)
- `wide` - 16:10 aspect ratio
- `ultrawide` - 21:9 aspect ratio

## Complex Examples

### Product Card
```tsx
<Card variant="elevated" size="lg" className="max-w-sm">
  <CardImage
    src="/product-image.jpg"
    alt="Product"
    aspectRatio="square"
  />
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-bold text-green-600">$99.99</p>
    <p className="text-sm text-gray-500">In stock</p>
  </CardContent>
  <CardFooter>
    <Button variant="default" size="sm">Add to Cart</Button>
    <Button variant="outline" size="sm">View Details</Button>
  </CardFooter>
</Card>
```

### User Profile Card
```tsx
<Card variant="interactive" className="max-w-md">
  <CardHeader className="flex-row items-center gap-4">
    <Avatar className="h-12 w-12">
      <AvatarImage src="/avatar.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <CardTitle>John Doe</CardTitle>
      <CardDescription>Software Engineer</CardDescription>
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-gray-600">
      Passionate about building great user experiences with React and TypeScript.
    </p>
  </CardContent>
  <CardFooter>
    <div className="flex gap-2">
      <Badge variant="secondary">React</Badge>
      <Badge variant="secondary">TypeScript</Badge>
      <Badge variant="secondary">Next.js</Badge>
    </div>
  </CardFooter>
</Card>
```

### Statistics Card
```tsx
<Card variant="ghost" className="text-center">
  <CardHeader>
    <CardTitle className="text-3xl font-bold text-blue-600">1,234</CardTitle>
    <CardDescription>Total Users</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center justify-center gap-2 text-green-600">
      <Icon icon="mdi:trending-up" className="h-4 w-4" />
      <span className="text-sm">+12% from last month</span>
    </div>
  </CardContent>
</Card>
```

## Props

### Card Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'ghost' \| 'interactive'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant |
| `design` | `'default' \| 'curved' \| 'rounded' \| 'square'` | `'default'` | Border radius design |
| `asChild` | `boolean` | `false` | Render as different element |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

### CardHeader Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Header content |

### CardTitle Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Title content |

### CardDescription Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Description content |

### CardContent Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Content |

### CardFooter Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Footer content |

### CardImage Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | - | Image source URL |
| `alt` | `string` | - | Image alt text |
| `aspectRatio` | `'square' \| 'video' \| 'wide' \| 'ultrawide'` | `'video'` | Aspect ratio |
| `className` | `string` | - | Additional CSS classes |

## Customization

### Custom Styling
```tsx
<Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  <CardContent>Custom styled card</CardContent>
</Card>
```

### Custom Variants
```tsx
// Extend the cardVariants in your component
const customCardVariants = cva(
  "relative overflow-hidden transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        ...cardVariants.variants.variant,
        custom: "bg-gradient-to-r from-pink-500 to-yellow-500 text-white",
      },
    },
  }
);
```

## Best Practices

1. **Use semantic structure**: Always use `CardHeader`, `CardContent`, and `CardFooter` for proper content organization
2. **Provide alt text**: Always include meaningful alt text for images
3. **Choose appropriate variants**: Use `interactive` for clickable cards, `elevated` for important content
4. **Maintain consistency**: Use consistent sizing and spacing within your application
5. **Consider accessibility**: Ensure proper contrast ratios and keyboard navigation

## Accessibility

The Card component includes:
- Proper semantic HTML structure
- Keyboard navigation support
- ARIA attributes where needed
- Focus management for interactive variants
- Screen reader friendly content structure

## Performance

- Uses `React.forwardRef` for optimal ref handling
- Implements `React.memo` patterns for performance
- Efficient class merging with `cn` utility
- Minimal re-renders with proper prop handling 