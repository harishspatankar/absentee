module Textlocal
  class SMS
    attr_reader :numbers, :message, :sender, :result

    def initialize(msg, numbers, unicode=false)
      @url      = TEXTLOCAL['url']
      @api_key  = TEXTLOCAL['api_key']
      @sender   = TEXTLOCAL['sender']
      @numbers  = format_numbers(numbers)
      @message = format_message(msg)
      @unicode = unicode
    end

    def deliver!
      uri = URI(URI.encode(@url))
      response = Net::HTTP.post_form(uri, body)
      @result = JSON.parse(response.body)
    end

    private

    def body
      attrs = {
        apiKey: @api_key,
        message: message,
        sender: sender,
        numbers: numbers,
        unicode: @unicode
      }
      attrs.merge!(test: true)
      attrs
    end

    def format_message(msg)
      disallowed_chars = ['^', '{', '}', '[', '~', ']', '`']
      msg = msg.gsub(/\n/, '%n').gsub('|', '/')
      disallowed_chars.each { |char| msg.gsub!(char, '') }
      msg
    end

    def format_numbers(numbers)
      nos = numbers.is_a?(Array) ? numbers : Array.new(1, numbers)
      # add ISD code to mobile number assuming all numbers are Indian numbers.
      nos.collect{|n| n.to_s.scan(/[0-9]{10}$/).prepend("91").join }.join(',')
    end
  end

  class DeliveryFailed < StandardError
    def message
      "Sms sending failed."
    end
  end
end
