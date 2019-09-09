class CreativeImageAnalyzer < ActiveStorage::Analyzer::ImageAnalyzer
  def metadata
    super.dup.tap do |md|
      md[:name] = @blob.filename

      if md[:height].present? && md[:width].present?
        size = "#{md[:width]}x#{md[:height]}"
        md[:format] = case size
          when "20x20", "40x40" then "icon"
          when "200x200" then "small"
          when "260x200" then "large"
          when "512x320" then "wide"
          when "300x40" then @blob.svg? ? "svg/readme+top" : nil
        end
      end

      md[:format] ||= "unknown"
    end
  end
end
