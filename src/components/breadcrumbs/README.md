# Breadcrumbs Component

A flexible, accessible breadcrumb navigation component built with TypeScript, CVA (Class Variance Authority), and Tailwind CSS. The Breadcrumbs component provides multiple variants, separators, and customization options for creating consistent navigation experiences.

## Features

- 🧭 **Multiple Variants**: Default, subtle, bold, and colored text styles
- 📏 **Flexible Sizing**: Small, default, large, and extra-large sizes
- 🔗 **Custom Separators**: Slash, chevron, arrow, dot, or custom separators
- 🏠 **Home Icon Support**: Optional home icon with customizable label
- 📝 **Smart Truncation**: Automatic label truncation and item limiting
- 🌙 **Dark Mode Support**: Built-in dark mode styling
- ♿ **Accessible**: Proper ARIA attributes and keyboard navigation
- 🎯 **TypeScript**: Full type safety with proper interfaces
- 🔧 **Flexible Navigation**: Support for both href and onClick handlers

## Components

The Breadcrumbs component consists of several sub-components:

- `Breadcrumbs` - Main container with automatic rendering
- `BreadcrumbItem` - Individual breadcrumb item for manual control
- `BreadcrumbSeparator` - Custom separator component

## Basic Usage

```tsx
import { Breadcrumbs } from "@/components/breadcrumbs";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Smartphones" }, // Last item (current page)
];

<Breadcrumbs items={breadcrumbItems} />
```

## Variants

### Default
```tsx
<Breadcrumbs 
  variant="default" 
  items={breadcrumbItems} 
/>
```

### Subtle
```tsx
<Breadcrumbs 
  variant="subtle" 
  items={breadcrumbItems} 
/>
```

### Bold
```tsx
<Breadcrumbs 
  variant="bold" 
  items={breadcrumbItems} 
/>
```

### Colored
```tsx
<Breadcrumbs 
  variant="colored" 
  items={breadcrumbItems} 
/>
```

## Sizes

### Small
```tsx
<Breadcrumbs 
  size="sm" 
  items={breadcrumbItems} 
/>
```

### Default
```tsx
<Breadcrumbs 
  size="default" 
  items={breadcrumbItems} 
/>
```

### Large
```tsx
<Breadcrumbs 
  size="lg" 
  items={breadcrumbItems} 
/>
```

### Extra Large
```tsx
<Breadcrumbs 
  size="xl" 
  items={breadcrumbItems} 
/>
```

## Separators

### Slash (Default)
```tsx
<Breadcrumbs 
  separator="slash" 
  items={breadcrumbItems} 
/>
```

### Chevron
```tsx
<Breadcrumbs 
  separator="chevron" 
  items={breadcrumbItems} 
/>
```

### Arrow
```tsx
<Breadcrumbs 
  separator="arrow" 
  items={breadcrumbItems} 
/>
```

### Dot
```tsx
<Breadcrumbs 
  separator="dot" 
  items={breadcrumbItems} 
/>
```

### Custom Separator
```tsx
<Breadcrumbs 
  separator="custom"
  customSeparator={<span className="mx-2 text-gray-400">→</span>}
  items={breadcrumbItems} 
/>
```

## Advanced Features

### With Home Icon
```tsx
<Breadcrumbs 
  showHomeIcon={true}
  homeIcon="mdi:home"
  homeLabel="Dashboard"
  items={breadcrumbItems} 
/>
```

### With Item Icons
```tsx
const itemsWithIcons = [
  { label: "Home", href: "/", icon: "mdi:home" },
  { label: "Products", href: "/products", icon: "mdi:package" },
  { label: "Electronics", href: "/products/electronics", icon: "mdi:devices" },
  { label: "Smartphones", icon: "mdi:cellphone" },
];

<Breadcrumbs items={itemsWithIcons} />
```

### With Click Handlers
```tsx
const itemsWithHandlers = [
  { 
    label: "Home", 
    onClick: () => router.push("/") 
  },
  { 
    label: "Products", 
    onClick: () => router.push("/products") 
  },
  { 
    label: "Electronics", 
    onClick: () => router.push("/products/electronics") 
  },
  { label: "Smartphones" },
];

<Breadcrumbs items={itemsWithHandlers} />
```

### Truncated Labels
```tsx
<Breadcrumbs 
  truncateLongLabels={true}
  maxLabelLength={15}
  items={breadcrumbItems} 
/>
```

### Limited Items
```tsx
<Breadcrumbs 
  maxItems={3}
  items={breadcrumbItems} 
/>
```

## Manual Control with Sub-components

### Using BreadcrumbItem
```tsx
import { BreadcrumbItem, BreadcrumbSeparator } from "@/components/breadcrumbs";

<nav aria-label="Breadcrumb" className="flex items-center space-x-1">
  <ol className="flex items-center space-x-1">
    <BreadcrumbItem href="/" icon="mdi:home">
      Home
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem href="/products" icon="mdi:package">
      Products
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem href="/products/electronics" icon="mdi:devices">
      Electronics
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem isActive={true} icon="mdi:cellphone">
      Smartphones
    </BreadcrumbItem>
  </ol>
</nav>
```

### Custom Separator
```tsx
<BreadcrumbSeparator variant="colored">
  <Icon icon="mdi:chevron-right" className="h-4 w-4" />
</BreadcrumbSeparator>
```

## Complex Examples

### E-commerce Breadcrumbs
```tsx
const ecommerceItems = [
  { label: "Home", href: "/", icon: "mdi:home" },
  { label: "Shop", href: "/shop", icon: "mdi:shopping" },
  { label: "Electronics", href: "/shop/electronics", icon: "mdi:devices" },
  { label: "Computers", href: "/shop/electronics/computers", icon: "mdi:laptop" },
  { label: "Laptops", href: "/shop/electronics/computers/laptops", icon: "mdi:laptop-windows" },
  { label: "Gaming Laptops" },
];

<Breadcrumbs 
  variant="colored"
  separator="chevron"
  showHomeIcon={true}
  maxItems={5}
  truncateLongLabels={true}
  maxLabelLength={12}
  items={ecommerceItems} 
/>
```

### Admin Dashboard Breadcrumbs
```tsx
const adminItems = [
  { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
  { label: "Users", href: "/admin/users", icon: "mdi:account-group" },
  { label: "User Management", href: "/admin/users/manage", icon: "mdi:account-cog" },
  { label: "Edit User" },
];

<Breadcrumbs 
  variant="bold"
  separator="arrow"
  size="lg"
  items={adminItems} 
/>
```

### File System Breadcrumbs
```tsx
const fileSystemItems = [
  { label: "Root", href: "/", icon: "mdi:folder" },
  { label: "Documents", href: "/documents", icon: "mdi:folder-text" },
  { label: "Projects", href: "/documents/projects", icon: "mdi:folder-multiple" },
  { label: "Web Development", href: "/documents/projects/web-dev", icon: "mdi:folder-code" },
  { label: "React App" },
];

<Breadcrumbs 
  variant="subtle"
  separator="dot"
  showHomeIcon={true}
  homeIcon="mdi:folder"
  homeLabel="Root"
  items={fileSystemItems} 
/>
```

## Props

### Breadcrumbs Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | - | Array of breadcrumb items |
| `variant` | `'default' \| 'subtle' \| 'bold' \| 'colored'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Size variant |
| `separator` | `'slash' \| 'chevron' \| 'arrow' \| 'dot' \| 'custom'` | `'slash'` | Separator type |
| `customSeparator` | `ReactNode` | - | Custom separator element |
| `maxItems` | `number` | - | Maximum number of items to display |
| `showHomeIcon` | `boolean` | `false` | Show home icon |
| `homeIcon` | `string` | `'mdi:home'` | Home icon name |
| `homeLabel` | `string` | `'Home'` | Home label text |
| `truncateLongLabels` | `boolean` | `false` | Truncate long labels |
| `maxLabelLength` | `number` | `20` | Maximum label length |
| `asChild` | `boolean` | `false` | Render as different element |
| `className` | `string` | - | Additional CSS classes |

### BreadcrumbItem Interface
| Property | Type | Description |
|----------|------|-------------|
| `label` | `string` | Display text for the breadcrumb |
| `href` | `string?` | URL for navigation (optional) |
| `icon` | `string?` | Iconify icon name (optional) |
| `onClick` | `() => void?` | Click handler (optional) |

### BreadcrumbItem Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'subtle' \| 'bold' \| 'colored'` | `'default'` | Visual style variant |
| `isActive` | `boolean` | `false` | Whether item is active (current page) |
| `href` | `string` | - | URL for navigation |
| `onClick` | `() => void` | - | Click handler |
| `icon` | `string` | - | Iconify icon name |
| `children` | `ReactNode` | - | Item content |
| `className` | `string` | - | Additional CSS classes |

### BreadcrumbSeparator Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'subtle' \| 'colored' \| 'custom'` | `'default'` | Separator style variant |
| `children` | `ReactNode` | - | Custom separator content |
| `className` | `string` | - | Additional CSS classes |

## Customization

### Custom Styling
```tsx
<Breadcrumbs 
  className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
  items={breadcrumbItems} 
/>
```

### Custom Variants
```tsx
// Extend the breadcrumbsVariants in your component
const customBreadcrumbsVariants = cva(
  "flex items-center space-x-1 text-sm font-medium",
  {
    variants: {
      variant: {
        ...breadcrumbsVariants.variants.variant,
        custom: "text-purple-600 dark:text-purple-400",
      },
    },
  }
);
```

### Custom Navigation Logic
```tsx
const handleBreadcrumbClick = (item: BreadcrumbItem) => {
  if (item.href) {
    // Use Next.js router instead of window.location
    router.push(item.href);
  } else if (item.onClick) {
    item.onClick();
  }
};

const itemsWithCustomNav = breadcrumbItems.map(item => ({
  ...item,
  onClick: () => handleBreadcrumbClick(item)
}));

<Breadcrumbs items={itemsWithCustomNav} />
```

## Best Practices

1. **Always include the current page**: The last item should represent the current page and not be clickable
2. **Use meaningful labels**: Keep labels concise but descriptive
3. **Provide icons**: Use icons to improve visual recognition, especially for home and category items
4. **Limit depth**: Don't exceed 5-7 levels to avoid overwhelming users
5. **Handle long paths**: Use truncation or item limiting for very deep hierarchies
6. **Maintain consistency**: Use consistent styling and behavior across your application
7. **Consider mobile**: Ensure breadcrumbs are usable on smaller screens

## Accessibility

The Breadcrumbs component includes:
- Proper semantic HTML structure with `<nav>` and `<ol>` elements
- ARIA labels and current page indicators
- Keyboard navigation support (Enter and Space keys)
- Screen reader friendly content structure
- Proper focus management
- Semantic markup for navigation context

## Performance

- Uses `React.forwardRef` for optimal ref handling
- Efficient class merging with `cn` utility
- Minimal re-renders with proper prop handling
- Optimized item processing and rendering
- Memory efficient with proper cleanup

## Integration with Next.js

### Using Next.js Router
```tsx
import { useRouter } from 'next/router';

const router = useRouter();

const itemsWithRouter = [
  { 
    label: "Home", 
    onClick: () => router.push("/") 
  },
  { 
    label: "Products", 
    onClick: () => router.push("/products") 
  },
  { label: "Current Page" },
];

<Breadcrumbs items={itemsWithRouter} />
```

### Dynamic Breadcrumbs from Route
```tsx
import { useRouter } from 'next/router';

const router = useRouter();

const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  
  return segments.map((segment, index) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: `/${segments.slice(0, index + 1).join('/')}`,
  }));
};

const breadcrumbItems = generateBreadcrumbs(router.pathname);

<Breadcrumbs items={breadcrumbItems} />
``` 