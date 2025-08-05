# Modal Component

A unified, flexible modal component system that supports multiple variants and sizes with seamless animations and accessibility features.

## Features

- **Multiple Variants**: Default (centered), Side (slide-in), and Float (top-right)
- **Responsive Sizes**: Small, Medium, and Large
- **Dark Mode Support**: Automatic dark mode styling
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Smooth Animations**: CSS transitions and transforms
- **Click Outside to Close**: Built-in click outside detection
- **Body Scroll Lock**: Prevents background scrolling when modal is open
- **Custom Scrollbars**: Styled scrollbars for modal content
- **TypeScript Support**: Full TypeScript definitions

## Usage

### Basic Example

```tsx
import { useState } from 'react';
import Modal from '@/components/modal';

export default function MyComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      <Modal
        show={showModal}
        title="My Modal"
        desc="Optional description"
        closeModal={() => setShowModal(false)}
      >
        <p>Your modal content goes here</p>
      </Modal>
    </>
  );
}
```

### Modal Variants

#### Default Modal (Centered)
```tsx
<Modal
  show={showModal}
  title="Default Modal"
  variant="default"
  closeModal={() => setShowModal(false)}
>
  Content here
</Modal>
```

#### Side Modal (Slide-in from right)
```tsx
<Modal
  show={showModal}
  title="Side Modal"
  variant="side"
  closeModal={() => setShowModal(false)}
>
  Content here
</Modal>
```

#### Float Modal (Top-right corner)
```tsx
<Modal
  show={showModal}
  title="Float Modal"
  variant="float"
  closeModal={() => setShowModal(false)}
>
  Content here
</Modal>
```

### Modal Sizes

```tsx
// Small modal
<Modal size="small" {...props} />

// Medium modal (default)
<Modal size="medium" {...props} />

// Large modal
<Modal size="large" {...props} />
```

### Complete Example with All Options

```tsx
<Modal
  show={showModal}
  title="Complete Modal Example"
  desc="This shows all available options"
  variant="default"
  size="medium"
  closeModal={() => setShowModal(false)}
  className="custom-modal-class"
>
  <div className="space-y-4">
    <p>Your content here</p>
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      Action Button
    </button>
  </div>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `show` | `boolean` | - | Controls modal visibility |
| `title` | `string` | - | Modal title (required) |
| `desc` | `string` | - | Optional modal description |
| `variant` | `'default' \| 'side' \| 'float'` | `'default'` | Modal display variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Modal size |
| `closeModal` | `() => void` | - | Function to close modal (required) |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `React.ReactNode` | - | Modal content (required) |

## Size Specifications

### Default Modal
- **Small**: `w-[90%] max-w-md`
- **Medium**: `w-[95%] max-w-2xl`
- **Large**: `w-[95%] max-w-5xl`

### Side Modal
- **Small**: `w-[35%]`
- **Medium**: `w-[50%]`
- **Large**: `w-[65%]`

### Float Modal
- **Small**: `max-w-sm`
- **Medium**: `max-w-md`
- **Large**: `max-w-lg`

## Styling

The modal system uses Tailwind CSS classes and supports:

- **Dark Mode**: Automatic dark mode detection and styling
- **Responsive Design**: Adapts to different screen sizes
- **Custom Scrollbars**: Styled scrollbars for content areas
- **Smooth Animations**: CSS transitions for all interactions

### Custom Styling

You can add custom classes via the `className` prop:

```tsx
<Modal
  className="my-custom-modal"
  {...otherProps}
>
  Content
</Modal>
```

## Accessibility

- Proper ARIA labels for close buttons
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Click outside to close functionality

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- IE11+ (with polyfills)
- Mobile browsers

## Demo

See `ModalDemo.tsx` for a complete demonstration of all modal variants and features. 