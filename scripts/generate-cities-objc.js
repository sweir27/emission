/**
 * Run this with: $ yarn generate-cities-objc
 */
const fs = require("fs")
const cities = require("../data/cityDataSortedByDisplayPreference.json")

const filename = "./Pod/Classes/Data/ARCity.m"

const citiesArray = cities.map(city => {
  const {
    name,
    slug,
    coordinates: { lat, lng },
  } = city
  return `[[ARCity alloc] initWithName:@"${name}" slug:@"${slug}" epicenter:[[CLLocation alloc] initWithLatitude:${lat} longitude:${lng}]]`
})

const contents = `
/**
 * Do NOT alter this file directly! It is auto-generated by the \`./scripts/generate-cities-objc.ts\` script.
 */

#import "ARCity.h"

@interface ARCity ()

- (instancetype)initWithName:(NSString *)name slug:(NSString *)slug epicenter:(CLLocation *)epicenter;

@end

@implementation ARCity

- (instancetype)initWithName:(NSString *)name slug:(NSString *)slug epicenter:(CLLocation *)epicenter;
{
    self = [super init];
    if (self) {
        _name = name;
        _slug = slug;
        _epicenter = epicenter;
    }
    return self;
}

+ (NSArray <ARCity *> *)cities
{
    static NSArray <ARCity *> *_computedCities = nil;
    if (!_computedCities) {
        _computedCities = @[
            ${citiesArray.join(",\n            ")}
        ];
    }
    return _computedCities;
}

@end
`
console.log("Generating Objective-C cities list...")
fs.writeFileSync(filename, contents)
console.log("Done.")