import { FC, useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchFieldProps {
  placeholder?: string
  onSearch: (query: string) => void | Promise<void>
  onClear?: () => void
  debounceMs?: number
  className?: string
  disabled?: boolean
  loading?: boolean
  initialValue?: string
  showClearButton?: boolean
  minLength?: number
  id?: string
  name?: string
}

const SearchField: FC<SearchFieldProps> = ({
  placeholder = 'Search...',
  onSearch,
  onClear,
  debounceMs = 1000,
  className = '',
  disabled = false,
  loading = false,
  initialValue = '',
  showClearButton = true,
  minLength = 0,
  id,
  name,
}) => {
  const [searchValue, setSearchValue] = useState(initialValue)
  const [isTyping, setIsTyping] = useState(false)

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      const timer = setTimeout(() => {
        setIsTyping(false)
        if (query.length >= minLength) {
          onSearch(query)
        } else if (query.length === 0) {
          onSearch('')
        }
      }, debounceMs)

      return () => clearTimeout(timer)
    },
    [onSearch, debounceMs, minLength],
  )

  // Effect to handle search with debouncing
  useEffect(() => {
    if (searchValue !== initialValue) {
      setIsTyping(true)
      const cleanup = debouncedSearch(searchValue)
      return cleanup
    }
  }, [searchValue, debouncedSearch, initialValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleClear = () => {
    setSearchValue('')
    setIsTyping(false)
    onClear?.()
    onSearch('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setIsTyping(false)
      onSearch(searchValue)
    }
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  const showLoader = loading || isTyping
  const showClear = showClearButton && searchValue.length > 0 && !disabled

  return (
    <div className={cn('relative flex items-center', className)}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            'pl-10 border-none active:ring-0 active:outline-none active:border-transparent', // Removes border on focus
            showClear && 'pr-20',
            !showClear && showLoader && 'pr-10',
          )}
        />

        {/* Loading indicator */}
        {showLoader && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Clear button */}
        {showClear && !showLoader && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default SearchField
