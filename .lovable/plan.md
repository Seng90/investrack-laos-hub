

## Plan: Page Transitions with Framer Motion + Sign Up / Sign In Pages

### 1. Install framer-motion
Add `framer-motion` as a dependency.

### 2. Create animated page wrapper
Create `src/components/PageTransition.tsx` -- a wrapper component using framer-motion's `motion.div` with fade + slight slide-up animation. Each page will be wrapped with this component.

### 3. Add AnimatePresence to routing
Update `src/App.tsx` to wrap `<Routes>` with framer-motion's `<AnimatePresence mode="wait">` and use `useLocation` to key route transitions. This requires moving `<Routes>` into a child component inside `<BrowserRouter>` so `useLocation` is available.

### 4. Wrap all pages with PageTransition
Update each page (`Index`, `CompanyDetail`, `SearchResults`, `Investors`, `NotFound`) to wrap their content with the `PageTransition` component.

### 5. Create Sign Up page
Create `src/pages/SignUp.tsx` with a polished registration form:
- Fields: Full Name, Email, Password, Confirm Password
- "Sign up with Google" social button placeholder
- Link to Sign In page
- Consistent InvesTrack branding and theme support

### 6. Create Sign In page
Create `src/pages/SignIn.tsx` with a login form:
- Fields: Email, Password
- "Remember me" checkbox, "Forgot password" link
- "Sign in with Google" social button placeholder
- Link to Sign Up page

### 7. Add routes and navigation links
- Add `/sign-up` and `/sign-in` routes in `App.tsx`
- Update Navbar's "Sign Up" button to link to `/sign-up`
- Add a "Sign In" link/button next to it in the Navbar (both desktop and mobile)

### Technical Details
- Page transition animation: `opacity 0 -> 1`, `translateY(20px) -> 0`, duration ~0.3s with ease-out
- Exit animation: `opacity 1 -> 0`, `translateY(-10px)`, duration ~0.2s
- Auth pages are UI-only (no backend) -- forms show toast on submit as placeholder
- Both auth pages will include the Navbar and Footer for consistency

